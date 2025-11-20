import express from 'express'
import { users } from '../models/user.js';
import { auth } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path'
import fs from 'fs'

export const userrouter = new express.Router();



//creating a multer middleware
const upload = multer({
    limits:{
        fileSize:1*1024*1024
    },


});

//joining the images with the current working directory
const uploadDir = path.join(process.cwd(),'images');

//if the images folder is not created create it automatically
fs.mkdirSync(uploadDir,{recursive:true});

//here comes the endpoint
//upload.single expect one file from the request with the name 'upload', the name should match the name inside the brackets.
userrouter.post('/upload/me/avatar',auth,upload.single('upload'),async(req,res)=>{

    
    
    

    try{

    

    //to conform only images or uploaded
    //i flag ,Makes it case-insensitive, so .JPG, .Jpg, .PNG all work.
  if (!req.file.originalName.match(/\.(jpg|jpeg|png)$/i)) {
    return res.status(400).send('Only images allowed');
  }

//to generate a unique name
//     const uniqueName = Date.now()+'.jpg';

//     //joining the filename to the images folder
//     const destPath = path.join(uploadDir,uniqueName);

// //copying the file from the request which is stored temporarily in the system to the images folder
//     fs.copyFile(req.file.path,destPath,(err)=>{
//         if(err) {
//             console.error('error:',err);
//             return res.status(500).send('Error saving file');
//         }
//         res.send('file uploaded');
        
//     })

//to convert the image to buffer and store it in the database
const fileBuffer = await fs.promises.readFile(req.file.path);

req.user.avatar = fileBuffer;
await req.user.save();

 res.set('Content-Type', 'image/jpeg');
 res.send(req.user.avatar);

}catch(error) {
    res.send(error)
}
    
},(error,req,res,next)=>{
    res.status(400).send({
        error:error.message
    })
})

userrouter.get('/user/me/avatar',auth,(req,res)=>{
    try{
        if(!req.user.avatar){
            throw new error();
        }
       res.set('Content-Type','image/jpeg');
       res.send(req.user.avatar);  
    }catch(error){
         res.status(400).send()
    }
    
})

userrouter.delete('/user/me/avatar',auth,async(req,res)=>{
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
})
// userrouter.use((err, req, res, next) => {
//   // Multer errors usually have name === 'MulterError'
//   if (err && err.name === 'MulterError') {
//     console.error('Multer error:', err);

//     return res.status(400).json({
//       error: 'Upload error',
//       message: err.message, // e.g. 'File too large'
//       code: err.code        // e.g. 'LIMIT_FILE_SIZE'
//     });
//   }

//   console.error('Unhandled error:', err);
//   res.status(500).json({ error: 'Something went wrong' });
// });


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



