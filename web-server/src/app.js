import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';



const app = express();
app.use(cors());
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);

const __dirname = path.dirname(__filename);
console.log(__dirname);


const renderHTML = path.join(__dirname,'../public')

app.use(express.static(renderHTML))





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