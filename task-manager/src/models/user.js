import  mongoose, { model }  from "mongoose";
import validator from "validator";

export const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
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
        }
    })
export const users = mongoose.model('user',userschema);
// const alice = new users({name:'alice ahamed',email:'rifays@gmail.com',age:'20',password:"PASskey"});

// await alice.save();
// const user = await users.find();
// console.log(user);