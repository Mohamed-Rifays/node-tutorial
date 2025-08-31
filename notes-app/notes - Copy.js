import fs from 'fs'
import validator from 'validator'
import chalk from 'chalk'
/*
export function getNotes(name ,email){
   if(!validator.isEmail(email)){
     fs.appendFileSync('notes.txt','invalid mailid')
   }
   const note = `name:${name} email:${email}`
   fs.appendFileSync('notes.txt',` \n${note}`)
}
   */

export const addNote = (title,body,email)=>{
  const notes = readnote()
  const duplicatenotes = notes.filter((note)=>{
    
    return note.title === title
    
  })

  
  
   if(duplicatenotes.length === 0){
 notes.push({
    'title':title,
    'body':body,
    'email':email
  })
  
  savenotes(notes)
  }
  else{
   console.log('note title taken')
 
  }
  }
  
 
 export const removenote = (title)=>{
  const load = readnote()
  const duplicatingnotes = load.filter(note=>
      note.title !== title
  )
  if(load.length === duplicatingnotes.length){
   
    console.log(chalk.bgRed('no note taken'));
  }
  
  else{
    savenotes(duplicatingnotes)
    console.log(chalk.bgGreen('note removed'))
  }
    
  };


  export const listNote = ()=>{
    const getnote = readnote()
    console.log(chalk.yellow.inverse('your notes'))
    getnote.forEach((listing)=>{
      console.log(listing);
      
    })
  }


 export const readnotes = (title)=>{
    const loadnotes = readnote()

    const finding = loadnotes.find(note=>note.title === title)
    

    if(finding){
     
      console.log(chalk.yellow.inverse(finding.title))
      console.log(finding.body);
      
      
    }
    else{
     console.log(chalk.red.inverse('no note found'))
    }
  }

const savenotes = (notes)=>{
  fs.writeFileSync('notes.json',JSON.stringify(notes))
}

const readnote = ()=>{
  try{
    
  
  const readingnote = fs.readFileSync('notes.json')
  const dataJSON =readingnote.toString();
  return JSON.parse(dataJSON)
  }
  catch{
    return [];
  }
}



/*
const prac = {
  name:'rifays',
  age:'20',

  practicing:function(){
    return 'hi'+ this.name;
    
  }
}
console.log(prac.practicing())
*/
/*
const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    },{
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    }],

    getTasksToDo(){
      const filtered = this.tasks.filter(note => note.completed === false)
      return filtered
    }
}


console.log(tasks.getTasksToDo())
*/