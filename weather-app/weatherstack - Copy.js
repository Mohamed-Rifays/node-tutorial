import ora from 'ora';
import chalk from 'chalk';

export async function getweather(latitude,longitude,place){

    const spinner = ora({
        text:`fetching weather for your place:${place}`,
        spinner:'weather'
    }).start();
    try{

    
       const response =await fetch(`http://api.weatherstack.com/current?access_key=00372cf0f3018e9484cb1f3ecef3416a&query=${latitude},${longitude}`)

       
  const result = await response.json()
 
  if(result.error){
    spinner.fail('failed to fetch,check the url')
    console.log('check the url');
    
  }
  else{
    spinner.succeed(`weather is fetched for ${place}`)
 console.log(chalk.green.inverse(`the temperature is:${result.current.temperature},it feels like:${result.current.feelslike}`));  
  }
  }
  catch(error){
    console.log(error);

     
    console.log(chalk.red.inverse('something went wrong'));
    
  }
  
  }
  