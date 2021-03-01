
const socket=io();

const textArea=document.getElementById("textarea");
const submit=document.getElementById("button");
const form=document.getElementById("form");
const addMessageSection=document.getElementById("add-message");

let name;
do {
    name=prompt("please enter your name")
} while (!name);

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(textArea.value){
        sendMessage(textArea.value)
        textArea.value="";
        textArea.focus()
    }
})

textArea.addEventListener("keyup",(e)=>{
    if(e.key==='Enter'&& e.target.value){
        sendMessage(e.target.value);
        e.target.value=""
    }
})

function sendMessage(msg){
    const message={
        name:name,
        message:msg.trim()
    }

    // append
    appendMessage(message,"outgoing")

    //send to server
    socket.emit("message",message)

}

function appendMessage(message,type){
    const messageDiv=document.createElement("div");
    messageDiv.classList.add(type,"message");
    const markup=`
    <h4 class="user-name">${message.name}</h4>
    <p>${message.message}</p>
    `;
    
    messageDiv.innerHTML=markup;
    
    addMessageSection.appendChild(messageDiv);
    
    scrollToBottom();
    
    setToLocalStorage(message,type);
    
}

// receive message

socket.on("message",message=>{
    appendMessage(message,'incoming')
    setToLocalStorage(message,"incoming");
})

function scrollToBottom(){
    addMessageSection.scrollTop=addMessageSection.scrollHeight
}

function setToLocalStorage(message,type){
    let oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];

    message.type=type;

    oldItems.push(message)
    
    localStorage.setItem("itemsArray",JSON.stringify(oldItems));
}
window.addEventListener("DOMContentLoaded",()=>{
    let oldItems=JSON.parse(localStorage.getItem("itemsArray")) || [];

    oldItems.forEach(item => {
        
        if(item.name===name){
        let type=item.type;
        appendMessage(item,type)
        }
    });
})