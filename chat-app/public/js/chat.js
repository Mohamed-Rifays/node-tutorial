const socket = io();

// //countUpdated should match the name of the event that is picked in the backend.
// socket.on('countUpdated',(count)=>{
// console.log('the count has be updated',count);

// })

// const bt = document.getElementById('increment');
// bt.addEventListener('click',()=>{
//     socket.emit('increment');
// })

// //emit is to send and .on is to receive.

const uname = document.getElementById('username');

const toggleName = document.getElementById('userData');
const forminput = toggleName.querySelector('input');
const formbutton = toggleName.querySelector('button');

const Location = document.getElementById('sendLocation');
const messages = document.getElementById('messages');

//Templates
const messageTemplate = document.getElementById('message-template').innerHTML;
const locationTemplate = document.getElementById('location-template').innerHTML;
const sidebarTemplate = document.getElementById('sidebar-template').innerHTML;
const sidebar = document.getElementById('sidebar');


//options (query)
const { username,room } = Qs.parse(location.search,{ignoreQueryPrefix:true})

toggleName.addEventListener('submit',(e)=>{
    e.preventDefault();

    //disable button
    formbutton.setAttribute('disabled','disabled');
    const mesg = e.target.elements.message.value;
    socket.emit('displaymessage',mesg,(error)=>{
        //enable button
        formbutton.removeAttribute('disabled');
        forminput.value = '';
        forminput.focus();
      if(error) {
        console.log(error);
      }
      console.log('message delivered');
      
    });
})  

socket.on('message',(message)=>{
   console.log(message);
   console.log(message.username);
   
   const html = Mustache.render(messageTemplate,{
    message: message.text,
    username:message.username,
    createdAt : moment(message.createdAt).format('h:mm a')
   });
    messages.insertAdjacentHTML('beforeend',html)
   
})

socket.on('sharelocation',(location)=>{
    console.log(location);
    const html = Mustache.render(locationTemplate,{
    location:location.url,
    username:location.username,
    createdAt:moment(location.createdAt).format('h:mm a')
  })
  messages.insertAdjacentHTML('beforeend',html)
})

socket.on('roomdata',({room,users})=>{
  const html = Mustache.render(sidebarTemplate,{
    room,users
  })
  sidebar.innerHTML = html;

})

Location.addEventListener('click',()=>{
    if(!navigator.geolocation) {
        return alert('geolocation is not supported by your browser');
    } 
    Location.setAttribute('disabled','disabled');
    
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        },()=>{
            console.log('Location shared');
            Location.removeAttribute('disabled');
        }) 
        

    })
})

socket.emit('join',{username,room},(error)=>{
   if(error) {
    alert(error)
    location.href = '/';
   }
})