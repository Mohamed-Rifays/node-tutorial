//common.js
// const fs = require('node:fs')
// fs.writeFileSync('notes.txt','hi')
// import * as fs from 'node:fs';

// fs.writeFileSync('notes.txt','this is written by node')

// fs.appendFileSync('notes.txt', ' by me')
import {name1,Myname,mail} from './utils.js'
//import { getNotes } from './notes.js'
import validator from 'validator'
import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { addNote } from './notes.js';
import { removenote } from './notes.js';
import { listNote } from './notes.js';
import { readnotes } from './notes.js';
/*
console.log('welcome')
console.log(name1)
console.log(chalk.inverse.red('hello'));
console.log(process.argv);

getNotes(Myname,mail)
console.log(validator.isEmail('rifays@gmail.com'));
*/
yargs(hideBin(process.argv)).command({
  'command':'add',
  'describe':'Adding a new node',
  'builder':{
    'title':{
      'describe':'note title',
      'type':'string',
      'demandOption':true
    },
    'body':{
       'describe':'body content',
       'type':'string',
       'demandOption':true
    },
    'email':{
      'describe':'email content',
      'type':'string',
      'demandOption':true
    }
  },
  handler(argv) {
     
    addNote (argv.title,argv.body,argv.email);
  }

}).parse()

yargs(hideBin(process.argv)).command({
  'command':'remove',
  'describe':"remove a note!",
  'builder':{
    'title':{
    'describe':'removing a note',
    'type':'string',
     'demandOption':true
    
  },
  'body':{
    'describe':'removing a note',
    'type':'string',
    'demandOption':true

  },
  'email':{
      'describe':'email content',
      'type':'string',
      'demandOption':true
    }
},
  handler(argv){
    removenote(argv.title)
   
  }
}).parse();

yargs(hideBin(process.argv)).command({
  'command':'read',
  'describe':'reading note',
  'builder':{
    'title':{
      'describe':"reding note",
      'demandOption':true,
      'type':'string'
    },
    'body':{
      'describe':'reading a note',
      'demandoption':true,
      'type':'string'

    }
  },

  handler:(argv)=>{
   
    readnotes(argv.title)
  }
}).parse();

yargs(hideBin(process.argv)).command({
  'command':'list',
  'describe':'listing a note',
  handler:()=>{
    listNote();
    
  }
}).parse()