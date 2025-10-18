import  mongoose, { model }  from "mongoose";
import validator from "validator";




const taskschema = new mongoose.Schema({
    description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})
export const tasks = mongoose.model('tasks',taskschema);









// const task = await taskinfo.find();
// console.log(task);

