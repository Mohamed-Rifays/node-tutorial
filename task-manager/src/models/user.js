import  mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { tasks } from "./task.js";
import { type } from "os";
import dotenv from 'dotenv';

dotenv.config();

export const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate(value) {
           if(!validator.isEmail(value)) {
             throw new Error("Invalid email");
           }
        }
        
    },
        age: {

         type:Number,
         default:0,
        validate(value) {
           if(value<18){
            throw new Error("Not eligible to vote")
           }
           }
        },
        password :{
            type:String,
            required:true,
            minlength:7,
            trim:true,
            validate(value) {
        if(value.toLowerCase().includes("password")) {
            throw new Error(" passwrod cannot contain password");
                } 
            }
        },
        tokens:[{
            token:{
              type : String,
              required:true  
            }
        }],
        avatar:{
            type:Buffer
        }
        
    },{
        timestamps:true
    })

    userschema.virtual('Tasks',{
        ref:'tasks',
        localField:'_id',
        foreignField:'owner'
    })

    userschema.methods.toJSON = function(){
        const user = this
        const userobject = user.toObject();
        delete userobject.password;
        delete userobject.tokens; 
        delete userobject.avatar;

        return userobject;
    }

 //methods are instance level function,on a single document.
    userschema.methods.generateAuthToken = async function() {
        const user = this;

        const token = jwt.sign({_id:user._id.toString()},'process.env.JWT_SECRET');

        user.tokens = user.tokens.concat({token});
        await user.save();
        console.log('data saved');
        
        return token;
        
    }

//statics are model level function,on whole model.
    userschema.statics.findByCredentials = (async(email,password)=>{
        const user = await users.findOne({email});
        if(!user) {
            throw new Error('Unable to login');
        }

        const ismatch = await bcrypt.compare(password,user.password);

        if(!ismatch) {
            throw new Error('Unable to login');
        }

        return user;
    })

    userschema.pre('save',async function (next){
        const user = this
        if(user.isModified('password')) {
             user.password = await bcrypt.hash(user.password,8);
        }
       
        
        next();
    })


    //{ document: true, query: false } → tells Mongoose you’re using deleteOne() on a document instance, not on the model.
    // This way, when you call user.deleteOne(), this middleware runs automatically.

    userschema.pre('deleteOne', { document: true, query: false },async function(next){
     const user = this;
     await tasks.deleteMany({owner:user._id})

     next()
    })

export const users = mongoose.model('user',userschema);
// const alice = new users({name:'alice ahamed',email:'rifays@gmail.com',age:'20',password:"PASskey"});

// await alice.save();
// const user = await users.find();
// console.log(user);