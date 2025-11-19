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
    owner :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    }
},{
    timestamps:true
})

taskschema.pre('save',async function (next){
    const task = this;

    if(task.isModified('password')){
      task.password = await bcrypt.hash(task.password,8);
    }
    next();
})
export const tasks = mongoose.model('tasks',taskschema);



//populate() used to populate the data that is relation to them.

//... it is a spread operator.





// const task = await taskinfo.find();
// console.log(task);

