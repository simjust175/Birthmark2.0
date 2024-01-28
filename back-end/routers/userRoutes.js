import express from 'express';
import userControllers from '../controllers/userControllers.js';

const route = express.Router();

//Post new user
route.post('/post', userControllers.postNewUser);

//Log in
route.post('/login', userControllers.userLogin);

//Patch user
route.patch('/patch/:id', userControllers.patchUser);

export default route;

