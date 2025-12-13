import express from 'express'
import  mongoose from "mongoose";
import { userrouter } from './routers/user.js';
import { taskrouter } from './routers/task.js';
import dotenv from 'dotenv';    
dotenv.config();

const app = express();
const port = process.env.PORT || process.env.PORT;

app.use(express.json());

await mongoose.connect('process.env.MONGO_URL');


// import multer from 'multer';
// const upload = multer();

// app.post('/upload',upload.single('upload'),(req,res)=>{
//     console.log(req.file);
    
//     console.log(req.file.path);
    
// res.send();
// })


app.use(userrouter);
app.use(taskrouter)


app.listen(port, ()=>{
    console.log('server is up on port' + port);
})


// import jwt from 'jsonwebtoken';

// const  myfunc = async ()=>{
//    const token = jwt.sign({_id:'hi123'},'secretkey');
//    console.log(token);
   
//    const data = jwt.verify(token,'secretkey');
//    console.log(data);
   
// }
// myfunc();

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


//i just tell my point and get me right or wrong , we use virtuals instead of giving a task object because everytime we create a task on that user it will updatee the arrat each time and stre the task as a array in the database for each user so to get rid of this we are using the virtual to make a connection between the user and task and get the task creted by the user without storing in the databse//

// import {tasks} from './models/task.js'       
// import { users } from './models/user.js';
// const main = async()=>{
//     const task = await tasks.findById('691356951bb99d609962d8e2');
//     await task.populate('owner');
//     console.log(task.owner);
    
//     const user = await users.findById('69122e5f888944f3ecc3427f');
   
//     await user.populate('Tasks');
//     console.log(user.Tasks);
    


    
// }
// main();
