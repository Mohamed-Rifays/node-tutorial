import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const render = path.join(dirname,'../public')

app.use(express.static(render));

app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
    
})