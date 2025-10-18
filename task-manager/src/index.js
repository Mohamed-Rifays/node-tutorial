import express from 'express'
import  mongoose from "mongoose";
import { users } from './models/user.js';
import { tasks } from './models/task.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

app.post('/users',async (req,res)=>{
    try{
     console.log(req.body.name);
     
    
   const user = new users(req.body);
   await user.save();
   console.log('Connected to:', mongoose.connection.name);

   console.log("data saved to db");
   

   res.send(user);
    }catch(error){
          res.send("something went wrong");

    }
    
})

app.get('/users',async(req,res)=>{
    try{
      const userinfo = await users.find({})
    res.send(userinfo)
    }
    catch(error) {
         res.status(400).send(error);
    }
    
})

app.post('/tasks',async(req,res)=>{
    try{
          const taskinfo = new tasks(req.body);
    await taskinfo.save();
        res.send(taskinfo);

    } catch(error) {
        res.status(500).send(error);
        console.log(Error);
        
    }
    

})

app.get('/tasks',async(req,res)=>{
    try{
        const taskinfo = await tasks.find({});

        res.send(taskinfo);

    }catch(error) {
       res.status(400).send(error);
    }
})

app.get('/tasks/:id',async(req,res)=>{
    try{
        console.log(req.params.id);
        
           const taskinfo = await tasks.findOne({_id:req.params.id});
           if(!taskinfo) {
            return res.status(400).send();
           }
     res.send(taskinfo);
    } catch(error) {
        res.status(500).send(error);
        
    }
    
})

app.listen(port, ()=>{
    console.log('server is up on port' + port);
})