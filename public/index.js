let socket = io();
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('log');
let title = document.getElementById('title');
let user;

Swal.fire({
    title:"Identify yourself",
    input:'text',
    allowOutsideClick:false,
    inputValidator: (value) => {
        return !value && 'Please write your user name';
    }
}).then(result => {
    user = result.value;
    localStorage.setItem('username', user);
    title.innerHTML = `Hello, <span>${user}</span>! welcome to weChat!`
})

chatBox.addEventListener('keyup', evt => {
    if(evt.key === "Enter"){
        if(chatBox.value.trim().length > 0){ //Por lo menos se envía un símbolo
            const date = new Date();
            const currentTime = `${date.getHours()}:${date.getMinutes()}`;
            socket.emit('message', {
                user,
                message:chatBox.value.trim(),
                currentTime 
            });
            chatBox.value="";
        }
    }
})

/*SOCKETS */
socket.on('log', data => {
    let messages = "";
    data.forEach(log => {
        if(log.user === localStorage.getItem('username')) {
            messages = messages + `<div class="message message-me">${log.message} <span>${log.currentTime}</span></div>`
        } else {
            messages = messages + `<div class="message message-other">${log.user} says: ${log.message} <span>${log.currentTime}</span> </div>`
        }
        
    })
    log.innerHTML = messages;
    log.scrollTop = log.scrollHeight; // Estudiar
})