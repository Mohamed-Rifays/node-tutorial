import express from 'express'
import { userrouter } from './routers/user.js';
import { taskrouter } from './routers/task.js';

export const app = express();

app.use(express.json());
app.use(userrouter);
app.use(taskrouter)




