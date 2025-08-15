// import { log } from 'console';
// import fs, { read } from 'fs'
// import { json } from 'stream/consumers';
// /*
// const load = JSON.parse(fs.readFileSync('1-json.json'));
// let newname = load.name;
// newname = 'rifays'
// let newage = load.age
// newage = '20'

// const newdata = {
//   'name':newname,
//   'planet':'earth',
//   'age':newage
// }

// fs.writeFileSync('1-json.json',JSON.stringify(newdata))

// const loadnewdata = fs.readFileSync('1-json.json')
// console.log(JSON.parse(loadnewdata))
// */

// const load = JSON.parse(fs.readFileSync('1-json.json'));
// load.name = 'rifi'
// load.age = '20'

// fs.writeFileSync('1-json.json',JSON.stringify(load))


// const prac = {
//   name:'rifays',
//   age:'20',

//   practicing:()=>{
//     return 'hi'
    
//   }
// }
// console.log(prac.practicing())


// const addition = (value1,value2,callback)=>{
//   setTimeout(()=>{
//     callback(value1+value2)
//   },2000)
// }

// addition(1,4,(sum)=>{
//   console.log("the total is:"+sum);
  
// })

// const product = {
//   price:'201',
//   label:'58',
//   stock:'shoe',
//   offer:'nothing'
// }

// const {stock, offer} = product;
// console.log(stock);
// console.log(offer);

// function geocode(place,weatherstack){
//   fetch(`https://us1.locationiq.com/v1/search?key=pk.f448722033c6db1c79081a4a6b41258f&q=${place}&format=json`).then(
//   response => response.json()
// )
// .then((result=>{
//   console.log(result);
//     const destination = {
//       'latitude':result[0].lat,
//       'longitude':result[0].lon
//     }

//     const {latitude,longitude} = destination;
//     // const latitude = result[0].lat;
//     // const longitude = result[0].lon;

//     console.log(latitude);
//     console.log(longitude);

//     weatherstack(latitude,longitude)
// }
 
// ))











// }

// function weatherstack(latitude,longitude){
//     fetch(`http://api.weatherstack.com/current?access_key=00372cf0f3018e9484cb1f3ecef3416a&query=${latitude},${longitude}`)

//    .then(response => response.json())

//   .then((result)=>{
//     console.log(
//     result.current.temperature
//    );
//   })

  
   


// }

// geocode('29 regimentalbazar thennur tiruchirappalli',weatherstack);


import { Readable } from 'node:stream';
const response =await fetch('https://us1.locationiq.com/v1/search?key=pk.f448722033c6db1c79081a4a6b41258f&q=tiruchirappalli&format=json');


// const reader = response.body.getReader();
// const decoder = new TextDecoder();
// while (true){
//   const {done, value} = await reader.read();
//   if(done) break;
//   console.log('Chunk',decoder.decode(value));
  
// }

const result = Readable.fromWeb(response.body); //converting from web to node.

let data = '';
result.on('data',(chunk)=>{
  data+=chunk.toString();
console.log('chunk:',JSON.parse(data));

});

result.on('end',()=>{
  const obj = JSON.parse(data);
  console.log(obj);
  
  console.log('completed');
  
})



