// console.log('st')

// setTimeout(()=>{
//   console.log('happening');
  
// },2000)


// setTimeout(()=>{
//  console.log('second');
 
// },1000)
// console.log('stp');


  
  




// async function geolocation(params) {
//   const response = await fetch('https://us1.locationiq.com/v1/search?key=pk.f448722033c6db1c79081a4a6b41258f&q=29%2Cregimental%20bazar%20%2Cthennur%2Ctiruchirappalli&format=json&');
//   const result = await response.json();
  
//   const latandlon = result[0];
//   console.log(chalk.green.inverse(`latitude:${latandlon.lat} longitude:${latandlon.lon}`));
  
// }
// geolocation();


import {weather} from './geocode.js'
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';




yargs(hideBin(process.argv)).command({
  'command':'add',
  'describe':'weather appi using CLI method',
  'builder':{
    'body':{
      'describe':'getting inpout from the user',
      'demandOption':true,
      'type':'string'
    }
  },
  handler(argv){
    
    weather(argv.body);
  }

  }
).parse();