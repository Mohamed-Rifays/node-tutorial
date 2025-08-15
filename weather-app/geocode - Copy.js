import chalk from 'chalk';
import ora from 'ora';
import { getweather } from './weatherstack.js';


export async function weather(place) {

  const spinner = ora({text:`Fetching geolocation for ${place}`,spinner:'weather'}).start();

  if (!place){
    spinner.fail(chalk.red.inverse('place is undefined'));
  }

  try{
   
   const response2 = await fetch(`https://us1.locationiq.com/v1/search?key=pk.f448722033c6db1c79081a4a6b41258f&q=${place}&format=json`)

 
   const result2 = await response2.json();
    
   if(result2.error){
     spinner.fail(`there is an error ,check the place requested`)
   }
   else{
     spinner.succeed(`geolcaation is fetched for ${place}`);

     const destination = {
      'latitude':result2[0].lat,
      'longitude':result2[0].lon
     }

     const{latitude,longitude} = destination;
  //    const latitude = result2[0].lat
  //  const longitude = result2[0].lon

  console.log(chalk.green.inverse(latitude));
  console.log(chalk.green.inverse(longitude));

  await getweather(latitude,longitude,place);
  
   }

   
  }catch(error){
    console.log(error);
    
    console.log("unable to connect");
    
  }
}