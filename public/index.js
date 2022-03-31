let socket = io();
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('log');
let user;

Swal.fire({
    title:"Identify yourself",
    input:'text',
    allowOutsideClick:false,
    inputValidator: (value) =>{
        return !value && 'Please write your user name'
    }
}).then(result=>{
    user = result.value;
})

chatBox.addEventListener('keyup',evt=>{
    if(evt.key==="Enter"){
        if(chatBox.value.trim().length>0){//Por lo menos se envía un símbolo
            socket.emit('message',{user,message:chatBox.value.trim()})
            chatBox.value="";
        }
    }
})
/*SOCKETS */
socket.on('log',data=>{
    let messages="";
    data.forEach(log=>{
        messages= messages + `${log.user} dice: ${log.message}</br>`
    })
    log.innerHTML=messages;
})