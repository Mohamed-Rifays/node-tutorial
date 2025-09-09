import {MongoClient} from 'mongodb';

const connectionURL = 'mongodb://127.0.0.1:27017/weather-app';
const databaseName = 'weather-app';

const client = new MongoClient(connectionURL);

export async function saveUser(name,location) {
    try{

         await client.connect();
         const db  = client.db(databaseName);
         const users = db.collection("users");

         const result = await users.insertOne({
            name : name,
            location:location
         })
        console.log("Inserted id",(result).insertedId)

    }catch(error){
        console.log(error);
        console.log("error inserting user info");
        
        
    }
    finally{
        await client.close();
    }
   
}

