import AdminControllers from '../controllers/adminControllers.js';
import express from 'express';

const route = express.Router();

//getAll
route.get("/", AdminControllers.getAllUsers);

//validate email
route.get("/validateEmail/", AdminControllers.validateEmail);

//forgot password
route.post('/forgot/', AdminControllers.forgotPwd);
route.get('/validateForgot/', AdminControllers.validateTempPwd);
route.patch('/newpwd/:user_email/', AdminControllers.updatePwd);

//birthday card
route.get('/birthdays', AdminControllers.getBirthdays);

export default route;