import express from 'express'
import  mongoose from "mongoose";
import { userrouter } from './routers/user.js';
import { taskrouter } from './routers/task.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

app.use(userrouter);
app.use(taskrouter)


app.listen(port, ()=>{
    console.log('server is up on port' + port);
})


import jwt from 'jsonwebtoken';

const  myfunc = async ()=>{
   const token = jwt.sign({_id:'hi123'},'secretkey');
   console.log(token);
   
   const data = jwt.verify(token,'secretkey');
   console.log(data);
   
}
myfunc();

// import bcrypt from 'bcrypt'
  
// const myfun =async () =>{
//    const pass = 'hello123';
//    const haspass = await bcrypt.hash(pass,8);

//    const ismatch = await bcrypt.compare('hello123',haspass);

//    console.log(pass);
//    console.log(haspass);
//    console.log(ismatch);
   
   
   
// }

// myfun();