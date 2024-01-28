import express from 'express';
import RecipientControllers from '../controllers/recipientControllers.js';
import auth from '../middleware/auth.js';

const route = express.Router();

//Post new recipient
route.post('/post', auth, RecipientControllers.postRecipient);

//GET all
route.get("/", auth, RecipientControllers.getAll);

//Search
route.get("/search/:user_id/", auth, RecipientControllers.getSearched);

//Patch recipient
route.patch('/patch/:id', auth, RecipientControllers.patchRecipient);

//Soft DELETE
route.delete("/delete/:id", RecipientControllers.deleteRecipient);

export default route;