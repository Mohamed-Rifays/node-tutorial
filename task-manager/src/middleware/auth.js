import jwt from 'jsonwebtoken';
import { users } from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

export const auth = async (req,res,next)=>{
    try {
        const token = req.header('Authorization').
        //to get rid of the bearer word.//
        replace('Bearer ','').trim() ;
        console.log(token);
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        
        console.log(decoded);
        
        const user = await users.findOne({_id:decoded._id, 'tokens.token':token})

        if(!user) {
            throw new Error();
        }
        req.token=token;
        req.user = user;
        next();
      
    }catch(error) {
      res.status(401).send({ error: 'please authenticate'})
    }
    
}
