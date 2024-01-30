import bcrypt from 'bcrypt';;
import Admin from '../database/models/Admin.js';


export default class AdminService {
    static async getAllUsersService({ query }) {
        try {
            const filterBy = query.filter || "*";
            const offset = query.offset || 0;
            const limit = query.limit || 30;
            const orderBy = query.orderBy || "user_email";
            const order = query.order || "DESC";
            const getAll = await Admin.findAll(filterBy, offset, limit, orderBy, order);
            return getAll;
        } catch (error) {
            throw new Error(error);
        };
    };

    //sign up email validation
    static async validateEmailService({ query }) {
        try {
            const findEmail = await Admin.findEmail(query.email);
            console.log("in find email", findEmail[0]);
            return findEmail[0]?.user_email;
        } catch (error) {
            throw new Error(error);
        }
    };
    // ~~~~~~~~ Birthday-card system ~~~~~~~~ \\

    static async getBirthdaysService(){
        try {
            const birthdays = await Admin.findBirthdays()
            console.log(birthdays);
            return birthdays;
        } catch (error) {
            throw new Error;
        }
    }


    // ~~~~~~~~ Forgot password ~~~~~~~~ \\

    static tempPwd() {
        return Math.floor(Math.random() * 900000) + 100000;
    }

    static async forgotPwdService(req) {
        try {
            console.log("hello!");
            let user_email = await this.validateEmailService(req);
            if (!user_email) return null;
            const temp = this.tempPwd();
            await Admin.createTemporaryPwd(temp, user_email);
            return { user_email: user_email, temp_pwd: temp };
        } catch (error) {
            throw new Error(error)
        };
    };

    static async validateTempPwdService({ query }) {
        try {
            const temp = await Admin.findTempPwd(query);
            if (!temp) return null;
            return temp;
        } catch (error) {
            throw new Error(error)
        };
    };

    
    static async updatePwdService({ body, params }) {
        console.log("body", body, params);
        try {
            const isValid = await Admin.validateNewPwd(body);
            if (isValid.error) {
                throw new Error(isValid.error.details[0].message);
             };
            const user_pwd = await bcrypt.hash(body.user_pwd, 10);
            const temp = await Admin.patchNewPwd(user_pwd, params.user_email);
            if (!temp) return null;
            return temp;
        } catch (error) {
            throw new Error(error)
        };
    };

};