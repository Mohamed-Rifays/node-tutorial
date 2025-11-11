import express from 'express'
import { tasks } from '../models/task.js';
import { users } from '../models/user.js';
import { auth } from '../middleware/auth.js'

export const taskrouter = new express.Router();

taskrouter.post('/tasks',auth,async(req,res)=>{
    try{
        //   const taskinfo = new tasks(req.body);
        const taskinfo = new tasks({
            ...req.body,
            owner: req.user._id
        })
         
    await taskinfo.save();
    console.log(taskinfo.password);
    
        res.send(taskinfo);

    } catch(error) {
        res.status(500).send(error);
        console.log(Error);
        
    }
    

})

taskrouter.get('/tasks',auth,async(req,res)=>{
    try{
        // const taskinfo = await tasks.find({owner:req.user._id});

        // res.send(taskinfo);

        const user = req.user;

         await user.populate('Tasks')
        res.send(user.Tasks);
        
    }catch(error) {
       res.status(400).send(error);
    }
})

taskrouter.get('/tasks/:id',auth,async(req,res)=>{
    try{
        const user = req.user
        console.log(req.params.id);
        const _id = req.params.id;
        
           const taskinfo = await tasks.findOne({_id,owner:req.user._id});
           
           if(!taskinfo) {
            return res.status(400).send();
           }

           res.send({taskinfo,owner:user});
    } catch(error) {
        res.status(500).send(error);
        
    }
    
})

taskrouter.patch('/tasks/:id',auth,async(req,res)=>{
   const updates = Object.keys(req.body);
   const arr = ['description','completed'];
   const isvalidate = updates.every((update)=>{
     return arr.includes(update);
   })

   if(!isvalidate) {
    return res.status(400).send("Invalid Upadte");
   }
   try{
   const task = await tasks.findOne({_id:req.params.id,owner:req.user._id});

   if(!task) { 
    return res.status(400).send();
   }

   updates.forEach((update) =>{
    task[update] = req.body[update];
   })
   await task.save();

   res.status(200).send(task);
   
   }catch(error) {
    res.status(500).send(error);
   }
  
})

taskrouter.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        const task = await tasks.findByIdAndDelete({_id:req.params.id,owner:req.user._id});

    if(!task) { 
        res.status(400).send("Invalid item to delete");
    }
    res.status(200).send(task);

    }catch(error) {
        res.send(error);
    }
})
