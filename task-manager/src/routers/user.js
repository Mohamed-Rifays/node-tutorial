import express from 'express'
import { users } from '../models/user.js';

export const userrouter = new express.Router();

userrouter.post('/users',async(req,res)=>{
    try{
     console.log(req.body.name);
     
    
   const user = new users(req.body);
   console.log(req.body.age);
   
   await user.save();

    const token = await user.generateAuthToken();
   console.log(req.body.email);
   


   console.log("data saved to db");
   

   res.send({user,token});
    }catch(error){
        res.send(error)
          res.send("something went wrong");

    }
    
})

userrouter.post('/users/login',async(req,res)=>{
    try{
        const user = await users.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.send({user,token});
    }catch(error) {
        console.log(error);
        
        res.status(400).send();
    }
})

userrouter.get('/users',async(req,res)=>{
    try{
      const userinfo = await users.find({})
    res.send(userinfo)
    }
    catch(error) {
         res.status(400).send(error);
    }
    
})

userrouter.patch('/users/:id',async(req,res)=>{
    const updates = Object.keys(req.body);
    const arr = ['name','email','age','password'];
    const isvalidate = updates.every((update)=>{
       return arr.includes(update);
    })
    
    if(!isvalidate) {
       return res.status(400).send("Invalid update ");
    }
    try{
    const user = await users.findById(req.params.id);
    updates.forEach((update)=>{
        user[update] = req.body[update];
    })
    await user.save();

    if(!user) {
         res.status(400).send(error);

    }
    res.status(200).send(user);
    }catch(error) {
        res.status(500).send(error);
    }
    
})

userrouter.delete('/users/:id',async(req,res)=>{
    try{
       const user = await users.findByIdAndDelete(req.params.id);

    if(!user) {
        res.status(400).send("Invalid item to id");
    }
    res.status(200).send(user);
    }catch(error) {
        res.send(error);
    }
})

