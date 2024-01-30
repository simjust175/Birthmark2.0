import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';

import userRoutes from './routers/userRoutes.js';
import recipientRoutes from './routers/recipientRoutes.js';
import adminRoutes from './routers/AdminRoutes.js';

const port = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log(process.env.PASSWORD);

app.use('/users', userRoutes);
app.use('/recipients', recipientRoutes);
app.use('/admin', adminRoutes);

app.listen(port, ()=> {
    console.log(`Birthmark running on port: ${port}`);
});

