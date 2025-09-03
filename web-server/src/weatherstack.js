export async function getweather(place){

    
    try{

    
       const response =await fetch(`http://api.weatherstack.com/current?access_key=00372cf0f3018e9484cb1f3ecef3416a&query=${place}`)

       
  const result = await response.json()
   
    if(result.success === false){
    return {
      error: result.error.type
     } }
 
  if(result.error){
      
    
    
    
    return {error : 'check the url'};
    
  }
  
  else{

  return {
    current :{
      temperature : result.current.temperature,
      feelslike : result.current.feelslike,
      humidity : result.current.humidity
    }
  }
  }
  }
  catch(error){
    

     
    return {
    error : 'something went wrong'
    } 
    
  }

  }
  


        
    

        