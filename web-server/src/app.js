import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs'
import { log } from 'console';
import {getweather} from './weatherstack.js'
import { title } from 'process';



const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json())

//getting the name of the file and directory

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);

const __dirname = path.dirname(__filename);
console.log(__dirname);

//joining the dirname with the the public directory
const renderHTML = path.join(__dirname,'../public')

app.use(express.static(renderHTML))
 
//creating the hbs and joining it with the partials
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

//setting the view of hbs
app.set('view engine','hbs')

 app.set('views',path.join(__dirname,'../templates/views'))

app.get('',async(req,res)=>{


   
  res.render('index',{
    title:'forecast',
    message:'WEATHER-FORECAST',
    footer:'Created by : Mohamed Rifays'
    

  })
})

app.get('/help',(req,res)=>{

  res.render('help',{
    title:'help page',
    message:'help message.',
    footer:'Created by : Mohamed Rifays'
  })
})

app.get('/contact',(req,res)=>{
   res.render('contact',{
    title:'contact page',
    message:'contact number : my contact number',
     footer:'Created by : Mohamed Rifays'
   })
})

app.post('/home',(req,res)=>{



  
  res.send({
    name:req.body.name,
    age:req.body.age
  })
   

})



app.get('/weather',async (req,res)=>{
  console.log(req.query.address);

  if(!req.query.address){
    return res.status(404).send({
      error:'You must provide an address in the query.'
    })
  }
  
  
   if(!req.query.address){
    return res.send({error:'add the address in the query'});
   }

   const src = req.query.address;
  res.send(await getweather(src))
})



app.get('/errortest',(req,res)=>{
   res.render('error-test',{
    title:'error-test',
    message:'testing'
   })
})

app.get('/errortest/*error',(req,res)=>{
  res.send("article not found")
});

app.use((req,res)=>{
   res.status(404).send("there is a 404 error please check it.")
})

app.listen(port,"0.0.0.0",()=>{
  console.log(`server is up on port ${port}`);
  
})



/*
  app.post('/weather', async (req,res)=>{
  console.log(req)
   const  location  = req.body.location;
   const weatherData = await getweather(location);
   
   if (weatherData.error){
    return res.render('weather',{
      result: `Error : ${weatherData.error}`
    })
   }
   
  res.json({
    message:weatherData.current.temperature
  })
})

export async function getweather(place){

    
    try{

    
       const response =await fetch(`http://api.weatherstack.com/current?access_key=00372cf0f3018e9484cb1f3ecef3416a&query=${place}`)

       
       
  const result = await response.json()
 
  if(result.error){
   
    console.log('check the url');

    return {error:'invalid location'}
    
  }
  
    
  

 return result;
  
  }
  catch(error){
    console.log(error);
    return { error: error.message};

     
   
    
  }
  
  }
  */