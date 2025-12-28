import {jest, test} from '@jest/globals';
jest.mock('../src/utils/upload.js', () => ({
  __esModule: true,
  default: {
    single: () => (req, res, next) => next()
  }
}));


import { tasks } from '../src/models/task.js';
import { users } from '../src/models/user.js';
import { app } from '../src/app.js';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { connectDB } from '../src/db/mongoose.js';



beforeAll(async () => {
  await connectDB();
});

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'mike',
  email: 'mike@gmail.com',
    age: "30",
    password: 'testing123',
    tokens:[{
        token: jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
};  

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'john',
    email: 'john@gmail.com',
      age: "25",
      password: 'mytesting123',   
        tokens:[{
            token: jwt.sign({_id:userTwoId},process.env.JWT_SECRET)
        }]
  };
const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: userOneId
};  
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: true,
    owner: userTwoId
};

const taskThree = { 
    _id: new mongoose.Types.ObjectId(),
    description: 'Third task',
    completed: true,
    owner: userOneId
};

beforeEach(async () => {
 await mongoose.connection.db.dropDatabase();

  await new users(userOne).save();  
    await new users(userTwo).save();
  await new tasks(taskOne).save();
    await new tasks(taskTwo).save();
    await new tasks(taskThree).save();
}
);
test('should fetch user tasks', async () => {
  const response = await request(app)
    .get('/tasks')  
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
   const userTasks = await tasks.find({ owner: userOneId });

   expect(response.body.length).toBe(2);
});

test('should not delete other users tasks', async () => {
  const response = await request(app)
    .delete(`/tasks/${taskTwo._id}`)    
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(401);
   const task = await tasks.findById(taskTwo._id);
   expect(task).not.toBeNull();
}
);

test('should not update other users tasks', async () => {
  const response = await request(app)
    .patch(`/tasks/${taskTwo._id}`) 
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'Updated Task'
    })
    .expect(401);
   const task = await tasks.findById(taskTwo._id);
   expect(task.description).toBe('Second task');
}
);


