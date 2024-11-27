let chats = JSON.parse(localStorage.getItem('chats')) || [];
const sendBtn = document.querySelector("#sendBtn")
const chatContainer = document.querySelector('#chats')
const loader = document.querySelector('#loader')
const clearBtn = document.querySelector('#clearBtn')
// console.log(sendBtn)

async function chat() {
    // get message
    let message = document.querySelector("#msg").value
    const newMessage = {
        role: 'user',
        content: message,
    }

    //   pushing the objet to array
    chats.push(newMessage)
    showChats()
    let containerHieght = chatContainer.scrollHeight;
    chatContainer.scroll(0, containerHieght)




    const url = 'https://gpt-4o.p.rapidapi.com/chat/completions';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '72c4b8bc51msh2ddf4bf045e4a4cp1f93afjsne2b2e3cfffb1',
            'x-rapidapi-host': 'gpt-4o.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'user',
                        content: message
                    }
                ]
            }
        )
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // pushing the response to the chat array
        chats.push(result.choices[0].message)
        localStorage.setItem('chats', JSON.stringify(chats))
        console.log(result);
        document.getElementById("msg").value = '';
    } catch (error) {
        console.error(error.message);
    }
    showChats()
    let containerHieghts = chatContainer.scrollHeight;
    chatContainer.scroll(0, containerHieghts)
    sendBtn.style.display = "block"
    loader.style.display = "none"
}
console.log("chats", chats)
sendBtn.addEventListener('click', () => {
    sendBtn.style.display = "none"
    loader.style.display = "block"
    chat()
})

// function to display the chat in the browser
function showChats() {
    chatContainer.innerHTML = '';
    let data = '';
    chats.forEach(chat => {
        data += `
        <div class="${chat.role}">
            <p class="${chat.role}"> <small>${chat.role}</small>${chat.content}</p>
        </div>
        `
    });

    chatContainer.innerHTML = data;
}

showChats()

let containerHieght = chatContainer.scrollHeight;
chatContainer.scroll(0, containerHieght)

// function to clear chats
function clearChats() {
    localStorage.removeItem('chats')
    chats = []
    showChats()
}

clearBtn.addEventListener('click', clearChats)