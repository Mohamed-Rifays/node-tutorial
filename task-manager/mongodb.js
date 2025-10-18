//CRUD Create Read Update Delete

import { log } from 'console';
import {MongoClient, ObjectId} from 'mongodb';


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const client = new MongoClient(connectionURL);

// const objectId = new ObjectId();
// console.log(objectId.id.length );

// console.log(typeof(objectId));
// console.log(objectId.getTimestamp());
// console.log(objectId.toHexString().length);


async function main() {
    try{
        await client.connect();
        console.log("connected successfully");

        const db = client.db(databaseName);

        const users = db.collection("users");
         const tasks = db.collection("tasks");

        try{

           

    const result1 = await tasks.insertMany([{
        description:"progress message",
        completed:'true',
        incomplete:'false'
    },
{
    description:"progress report",
    completed:"false",
    incomplete:'true'
},
    {
  
    description:"rank",
    completed:"dontknow",
    incomplete:'know'
    }])

console.log(result1.insertedIds);

    

        
        const result = await users.insertMany([{
            name:"rifays",
            age:20
        },
    {
        name:'mohamed',
        age:22
    },
    {
        name:'hafeez',
        age:21
    }
    

])
console.log('inserted successfully');
console.log(result.insertedIds);

}catch{
    console.log('unable to connect');
    
}

        
        const update = await users.updateMany(
            {name : "rifays"},
            { $set : {age: 30}}
        )
        
        console.log("updated:",update);
        
        const allusers = await users.find({age:21}).toArray();
        console.log(allusers);

        const allusers2 = await users.find({age:21}).count();
        console.log(allusers2);

        const deleteuser = await users.findOneAndDelete({name : "mohamed"});
        console.log("Deleted:",deleteuser);
        
        
    
    }catch(error){
        console.log(error);
        
    }
    finally{
        await client.close();
    }

   
    
 }

 main()