
import {jest} from '@jest/globals';
jest.mock('../src/utils/upload.js', () => ({
  __esModule: true,
  default: {
    single: () => (req, res, next) => next()
  }
}));

// jest.mock('../src/emails/account.js', () => ({
//   __esModule: true,
//   sendWelcomeEmail: jest.fn(),
//   sendCancellationEmail: jest.fn()
// }));
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';
import request from 'supertest';
import { users } from '../src/models/user.js';
import { app } from '../src/app.js';
import { connectDB } from '../src/db/mongoose.js';



beforeAll(async () => {
  await connectDB();
});

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'mike',
  email: 'mike@example.com',
  age: "30",
  password: 'testing123',
  tokens:[{
      token: jwt.sign({_id:userOneId},process.env.JWT_SECRET)
  }]

};

beforeEach(async () => {
await mongoose.connection.db.dropDatabase();
  await new users(userOne).save();
});

test('should signup a new user', async () => {
  const req = await request(app)
    .post('/users')
    .send({
      name: 'Test User',
      email: 'test@example.com',
      age: "30",
      password: 'testing123'
    })
    .expect(201);

    const res = await users.findById(req.body.user._id);
    expect(res).not.toBeNull();
});

test('should login existing user', async () => {
  const req = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);

    const res = await users.findById(userOneId);
    expect(req.body.token).toBe(res.tokens[1].token);

});

test('should not login nonexisting user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'hi@gmail.com',
      password: 'thisispass'
    })
    .expect(400);
});

// Additional tests can be added here as needed 

test('should get user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('should not get user for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

test('should delete account for user', async () => {
  const req = await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

    const res = await users.findById(userOneId);
    expect(res).toBeNull();
});

test('should not delete account for unauthenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});

test('should update valid user fields', async () => {
  const req = await request(app)
    .patch('/users/me') 
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Updated Name'
    })
    .expect(200); 
    const res = await users.findById(userOneId);
    expect(res.name).toBe('Updated Name');
});

test('should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me') 
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'New York'
    })
    .expect(400); 
});


