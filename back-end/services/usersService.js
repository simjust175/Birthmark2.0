import UserModels from '../database/models/Users.js';

import bcrypt from 'bcrypt';

class UserService {

    //sign up
    async postClientService(body) {
        const isValid = await UserModels.validateInfo(body);
        if (isValid.error) {
           throw new Error(isValid.error.details[0].message);
        };
        try {
            body.user_pwd = await bcrypt.hash(body.user_pwd, 10);
            const add = await UserModels.saveToDB(body);
            if (!add) return null;
            console.log("Posted & hashed successfully");
            return add;
        } catch (error) {
            throw new Error (error);
        }
    };

    //log-in
    async userLoginService(body){
        const isValid = await UserModels.validateLoginInfo(body);
        const userData = await UserModels.getUserByEmail(body.user_email) || null;
        //if(!userData) return null;
        console.log("userData", userData);
        const {id, user_name} = userData[0][0];
        const usersPwd = userData[0][0].user_pwd;
        if (isValid.error || !usersPwd) return res.status(404).json({ msg: "Missing details" });
       
        try {
            const loginValid = await bcrypt.compare(body.user_pwd, usersPwd);
            if (!loginValid) return null;

            //create JWT token
            const newToken = { token: await UserModels.generateToken(userData[0][0]) };
            await UserModels.patchUser(id, newToken);
            console.log("Auth successful", newToken);
            return {newToken, id, user_name};
        } catch (error) {
            throw new Error (`In services: cannot login: ${error}`);
        }
    };

    // patch
    async patchService(id, body){
        try {
            const patchedClient = await ClientModels.updateClientInfo(id, body);
            return patchedClient;
        } catch (error) {
            throw new Error(error)
        };
        
    }


};

export default new UserService();