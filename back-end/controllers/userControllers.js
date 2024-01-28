import { query } from "express";
import Users from "../database/models/Users.js";
import usersService from '../services/usersService.js';

class UsersControllers {
    //post
    static async postNewUser({ body }, res) {
        try {
            const addNew = await usersService.postClientService(body);
            res.status(200).json({ Congratulations: `New user ${body.user_name} added successfully`, addNew });
        } catch (error) {
            res.status(500).json({ Error: `Controllers: Cannot post client: ${error.message}` });
        };
    };

    //log-in 
    static async userLogin({ body }, res) {
        try {
            const newToken = await usersService.userLoginService(body);
            if (!newToken) return res.status(401).json({ msg: "Auth failed." });
            res.status(200).json({ msg: "Auth successful" , newToken});
        } catch (error) {
            res.status(500).json({ Error: `userService/userLoginService: Cannot login ${error.message}` });
        };
    };

    //patch
    static async patchUser({ body, params: { id } }, res) {
        try {
            await usersService.patchService(id, body);
            res.status(201).json({ Msg: `Successfully PATCHED client: ${id}`, patchedClient });
        } catch (error) {
            res.status(500).json({ Error: `Controllers: Cannot patch ${error.message}` });
        };
    };
};

export default UsersControllers;