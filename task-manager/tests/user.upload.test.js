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
  email: 'mike@gmail.com',
    age: "30",
    password: 'testing123',
    tokens:[{
        token: jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
};

beforeEach(async () => {
  await users.deleteMany();
  await new users(userOne).save();
});


test('should upload avatar image', async () => {
  await request(app)
    .post('/upload/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('upload', 'tests/fixtures/profile-pic.jpg')
    .expect(200); 
    const res = await users.findById(userOneId);
    expect(res.avatar).toEqual(expect.any(Buffer));
});