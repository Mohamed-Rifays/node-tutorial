//CRUD Create Read Update Delete

import { log } from 'console';
import {MongoClient} from 'mongodb';


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const client = new MongoClient(connectionURL);

async function main() {
    try{
        await client.connect();
        console.log("connected successfully");

        const db = client.db(databaseName);

        const users = db.collection("users");

        const result = await users.insertMany([{
            name:"rifays",
            age:20
        },
    {
        name:'mohamed',
        age:22
    }
])

        console.log("inserted id:",result.insertedIds);
        const update = await users.updateOne(
            {name : "mohamed"},
            { $set : {age: 30}}
        )
        
        console.log("updated:",update);
        
        const allusers = await users.find({}).toArray();
        console.log(allusers);

        const deleteuser = await users.deleteOne({name : "mohamed"});
        console.log("Deleted:",deleteuser);
        
        
    
    }catch(error){
        console.log(error);
        
    }
    finally{
        await client.close();;
    }
    
}

main()