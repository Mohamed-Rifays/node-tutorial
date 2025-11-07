import express from 'express'
import { tasks } from '../models/task.js';

export const taskrouter = new express.Router();

taskrouter.post('/tasks',async(req,res)=>{
    try{
          const taskinfo = new tasks(req.body);
         console.log(req.body.password);
    await taskinfo.save();
    console.log(taskinfo.password);
    
        res.send(taskinfo);

    } catch(error) {
        res.status(500).send(error);
        console.log(Error);
        
    }
    

})

taskrouter.get('/tasks',async(req,res)=>{
    try{
        const taskinfo = await tasks.find({});

        res.send(taskinfo);

    }catch(error) {
       res.status(400).send(error);
    }
})

taskrouter.get('/tasks/:id',async(req,res)=>{
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

taskrouter.patch('/tasks/:id',async(req,res)=>{
   const updates = Object.keys(req.body);
   const arr = ['description','completed','password'];
   const isvalidate = updates.every((update)=>{
     return arr.includes(update);
   })

   if(!isvalidate) {
    return res.status(400).send("Invalid Upadte");
   }
   try{
   const task = await tasks.findById(req.params.id);
   updates.forEach((update) =>{
    task[update] = req.body[update];
   })
   await task.save();

   res.status(200).send(task);
   if(!task) { 
    return res.status(400).send();
   }
   }catch(error) {
    res.status(500).send(error);
   }
  
})

taskrouter.delete('/tasks/:id',async(req,res)=>{
    try{
        const task = await tasks.findByIdAndDelete(req.params.id);

    if(!task) { 
        res.status(400).send("Invalid item to delte");
    }
    res.status(200).send(task);

    }catch(error) {
        res.send(error);
    }
})
