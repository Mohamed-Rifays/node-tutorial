import express from 'express'
import { users } from '../models/user.js';
import { auth } from '../middleware/auth.js';

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

userrouter.post('/users/logout',auth,async(req,res)=>{
  try {
      req.user.tokens = req.user.tokens.filter((token)=>{
          return token.token !==req.token; 
      })
      await req.user.save();
      res.send();
  }catch(error) {
     res.status(500).send()
  }
})

userrouter.post('/users/logoutall',auth,async(req,res)=>{
    try{
   req.user.tokens=[];
   await req.user.save();
    res.send()
    }catch(error){
        res.send(error)
    }
    
})

userrouter.get('/users/me',auth,async(req,res)=>{
    
    console.log('hi');
    
   res.send(req.user);
    
})

userrouter.patch('/users/me',auth,async(req,res)=>{
    const updates = Object.keys(req.body);
    const arr = ['name','email','age','password'];
    const isvalidate = updates.every((update)=>{
       return arr.includes(update);
    })
    
    if(!isvalidate) {
       return res.status(400).send("Invalid update ");
    }
    try{
    const user = req.user;
    updates.forEach((update)=>{
        user[update] = req.body[update];
    })
    await user.save();

   
    res.status(200).send(user);
    }catch(error) {
        res.status(500).send(error);
    }
    
})

userrouter.delete('/users/me',auth,async(req,res)=>{
    try{
    //    const user = await users.findByIdAndDelete(req.params.id);

    // if(!user) {
    //     res.status(400).send("Invalid item to id");
    // }
    // res.status(200).send(user);
    console.log('coming');
    
    await req.user.deleteOne();
    console.log('removed');
    
    res.send(req.user);

    }catch(error) {
        res.send(error);
    }
})

