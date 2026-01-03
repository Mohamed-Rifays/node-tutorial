const users = []
 
export const addUser = ({id,username,room})=>{
    //clean data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //validate the data
    if(!username || !room) {
        return {
            error : "Username and room are required!"
        }
    }

    //check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    //validate username
    if(existingUser) {
        return {
            error :"Username is in use!"
        }
    }

    //store user 
    const user = {id,username,room}
    users.push(user)
    return {user};
}

export const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
       return user.id === id;
    })
     if(index !== -1) {
        return users.splice(index,1)[0];
        //splice(index of the item,number of items to remove)
       }
}

export const getUser = (id)=>{
    const fetchuser = users.find((user)=>{
        return user.id === id;
    })
    if(fetchuser){
        return fetchuser;
    }
    else{
        return undefined;
    }
}

export const getUsersInRoom = (room)=>{
   const UsersInRomm = users.filter((user)=>{
      return user.room === room;
   })
   if(!UsersInRomm) {
     return [];
   }
   return UsersInRomm;
}



