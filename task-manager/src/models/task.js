import  mongoose, { model }  from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'



const taskschema = new mongoose.Schema({
    description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true
    }
})

taskschema.pre('save',async function (next){
    const task = this;

    if(task.isModified('password')){
      task.password = await bcrypt.hash(task.password,8);
    }
    next();
})
export const tasks = mongoose.model('tasks',taskschema);









// const task = await taskinfo.find();
// console.log(task);

