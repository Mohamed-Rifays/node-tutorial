import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import {Server} from 'socket.io';
import { Filter } from 'bad-words'
import { generateMessage,generateLocationMessage } from './utils/messages.js';
import { addUser,getUser,getUsersInRoom,removeUser } from './utils/users.js';

const app = express();
//creating the server explicitly, to take the control fot websocket.
const server = http.createServer(app);

const io = new Server(server);
const port = process.env.PORT || 3000;
app.use(express.json());

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const render = path.join(dirname,'../public')

app.use(express.static(render));

// let count = 0;

io.on('connection',(socket)=>{
    
    console.log('new websokcet connection');

    // socket.emit('countUpdated',count);
    // socket.on('increment',()=>{
    //     count++;
    //     //socket.emit for particular connection.
    //     //socket.emit('countUpdated',count);

    //     //io.emit is for all connection..
    //     io.emit('countUpdated',count);
    // })
    

    socket.on('join',({username,room},callback)=>{

        const { error,user } = addUser({id:socket.id,username,room})

        if (error) {
            return callback(error)
        }

        //join is only used in server side 
        //it is other form of emit where only the chat room persons can do.

        //io.to.emit is similar to io.emit but in the room we use it.
        //socket.broadcast.to.emit is similar to socket.broadcast.emit in the room we use it.
      socket.join(user.room);
      socket.emit('message',generateMessage('welcome!'))
      socket.broadcast.to(user.room).emit('message',generateMessage(`${user.username} has joined`));

      callback();
    })

    socket.on('displaymessage',(message,callback)=>{
        const filter = new Filter();

        if(filter.isProfane(message)) {
            return callback('profanity not allowed');
        }
       io.emit('message',generateMessage(message));
       callback();

    })

    socket.on('sendLocation',(location,shared)=>{
        io.emit('sharelocation',generateLocationMessage(`https://google.com/maps?q=${location.latitude},${location.longitude}`))
        shared();
    }

       
    )

    socket.on('disconnect',()=>{
        io.emit('message',generateMessage('a user has left'));
    })

    

    })

    




//io refers to the server  and  socket refers to the each client.

server.listen(port,()=>{
    console.log(`server is up on port ${port}`);
    
})