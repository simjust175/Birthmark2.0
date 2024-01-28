import AdminService from "../services/AdminServices.js";
import sendEmail from '../utilities/sendTempPwd.js';
import { config } from 'dotenv';
config();

class AdminControllers {
    //get all users:
    static async getAllUsers(req, res) {
        try {
            const allUsers = await AdminService.getAllUsersService(req);
            if (!allUsers) return res.status(404).json({ Error: "adminControllers/getAllUsers()" });
            res.status(200).json({ allUsers });
        } catch (error) {
            res.status(500).json({ Error: `In ADminService/getAll() ${error.message}` })
        };
    };

    static async validateEmail(req, res) {
        try {
            const validate = await AdminService.validateEmailService(req);
            if (!validate) return res.status(404).json({ Error: "adminControllers/validateEmail()" });
            res.send(validate);
        } catch (error) {
            res.status(500).json({ Error: `In ADminService/validateEmailService() ${error.message}` })
        };
    };
     // ~~~~~~~~~~~~~~~// Birthday-card system \\~~~~~~~~~~~~~~~~~~~~ \\

     static async getBirthdays(req, res){
        try {
            const birthdays = await AdminService.getBirthdaysService();
            res.status(200).json({ msg: "there rae some birthdays", birthdays})
        } catch (error) {
            res.status(500).json({ Error: `In ADminService/getBirthdaysService() ${error.message}` })
        }
     }

    // ~~~~~~~~~~~~~~~// retrieve pwd \\~~~~~~~~~~~~~~~~~~~~ \\
    
    static async forgotPwd(req, res) {
        try {
            const {user_email, temp_pwd} = await AdminService.forgotPwdService(req);
            if (!user_email) return res.status(404).json({ Error: "adminControllers/forgotPwd()" });
            console.log("we are neaer>>>>>", user_email);
            sendEmail(user_email, temp_pwd);
            res.status(200).json({ msg: "sign in with temp password" });
        } catch (error) {
            res.status(500).json({ Error: `In ADminService/forgotPwdService() ${error.message}` })
        };
    };

    static async validateTempPwd(req, res) {
        try {
            const isTempValid = await AdminService.validateTempPwdService(req);
            console.log("in controllers/validateTempPwd", isTempValid);
            if (!isTempValid) return res.status(404).json({ Error: "adminControllers/forgotPwd()" });
            res.status(200).json({ msg: "success" });
        } catch (error) {
            res.status(500).json({ Error: `In ADminService/validateTempPwdService() ${error.message}` })
        };
    };

    static async updatePwd(req, res){
        console.log("welcome aboard");
        try {
            const patch = await AdminService.updatePwdService(req);
            console.log("patch in controllers", patch);
            if (!patch) return res.status(404).json({ Error: "adminControllers/updatePwd()" });
            res.status(200).json({ msg: "password updated successfully" });
        } catch (error) {
            res.status(500).json({ Error: `In ADminService/updatePwdService() ${error.message}` })
        };
    };

};

export default AdminControllers;