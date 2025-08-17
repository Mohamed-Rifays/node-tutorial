import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs'
import { title } from 'process';


const app = express();
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

app.get('',(req,res)=>{
  res.render('index',{title:'hbs setup',
    message:'dynamic html',
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
    message:'contact number : 8778867174',
     footer:'Created by : Mohamed Rifays'
   })
})

app.post('/home',(req,res)=>{



  
  res.send({
    name:req.body.name,
    age:req.body.age
  })
   

})



app.get('/weather',(req,res)=>{
   res.send({
    forecast:'33 degrees',
    locatiion:'Tiruchirappalli'
   })
})

app.get('/contact',(req,res)=>{
  res.send('contact')
})

app.listen(3000,()=>{
  console.log('server is up on port 3000');
  
})