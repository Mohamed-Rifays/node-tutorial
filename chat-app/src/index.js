import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import {Server} from 'socket.io';
import { log } from 'console';
import { Filter } from 'bad-words'

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
    socket.broadcast.emit('message','new user has joined');

    socket.on('displaymessage',(userName,callback)=>{
        const filter = new Filter();

        if(filter.isProfane(userName)) {
            return callback('profanity not allowed');
        }
       io.emit('message',`welcome! ${userName}`);
       callback();

    })

    socket.on('sendLocation',(location,shared)=>{
        io.emit('message',`https://google.com/maps?q=${location.latitude},${location.longitude}`)
        shared();
    }

       
    )

    socket.on('disconnect',()=>{
        io.emit('message','a user has left');
    })

    

    })

    




//io refers to the server  and  socket refers to the each client.

server.listen(port,()=>{
    console.log(`server is up on port ${port}`);
    
})