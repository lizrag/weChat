import express from 'express';
import { Server } from 'socket.io';
import __dirname from './utils.js';

const app = express();
const PORT = process.env.PORT||8080;
app.use(express.static(__dirname+'/public'))
const server = app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})
const io = new Server(server);

const log = [];
io.on('connection',socket=>{
    socket.on('message',data=>{
        log.push(data);
        io.emit('log',log)
    })
})