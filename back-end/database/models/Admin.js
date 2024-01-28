import db from '../config/db.js';
import joi from 'joi';
const isDeleted = "deleted_at IS NULL";

export default class Admin {

    // GET all users
    static async findAll(filter, offset, limit, orderBy, order){
      const get = `SELECT ${filter} FROM users WHERE ${isDeleted} AND id BETWEEN ? AND ? ORDER BY ${orderBy} ${order}`;
      const [getAll, _] = await db.query(get, [offset, limit]);
      return getAll;
    };

    // sign up email 
    static async findEmail(user_email){
      const find = `SELECT user_email FROM users WHERE ${isDeleted} AND user_email = ?`;
      const [noEmailFound, _] = await db.query(find, [user_email]);
      //return Boolean(noEmailFound.length);
      return noEmailFound;
    };


    //GENERIC VERIFYING FUNCTION!!!
    // static async findEmail(byInfo, info){
    //   const find = `SELECT ${byInfo} FROM users WHERE ${isDeleted} AND ${byInfo} = ?`;
    //   const [noInfoFound, _] = await db.query(find, [info]);
    //   return noInfoFound;
    // };

    // ~~~~~~~ Birthday card system ~~~~~~~ \\

    static async findBirthdays() {
      const get = `
      SELECT recipients.first_name, recipients.last_name, recipients.email, recipients.birthday, recipients.style,
      users.user_name, users.user_email FROM recipients
      INNER JOIN users
      ON users.id = recipients.user_id 
      WHERE recipients.${isDeleted} AND 
      DAY(birthday) = DAY(CURDATE()) AND MONTH(birthday) = MONTH(CURDATE())`
      const [getBirthday, _] = await db.execute(get);
      return getBirthday;
  };

  // const get = `SELECT *, users.user_name, users.user_email FROM recipients
      // INNER JOIN users
      // ON users.id = recipients.user_id
      // DAY(birthday) = DAY(CURDATE()) AND MONTH(birthday) = MONTH(CURDATE());`;

  static async printer(){
    const all = `SELECT * From users`;
    const [findAll, _] = await db.query(all);
    return this.findAll
  }

   // ~~~~~~~ forgot password ~~~~~~~ \\

   static async createTemporaryPwd(tempPwd, user_email){
    console.log("in models", tempPwd + " "  + user_email);
     const insert = `UPDATE users Set temp_pwd = ? WHERE ${isDeleted} AND user_email = ?`;
     const [insertTemp, _] = await db.query(insert, [tempPwd, user_email]);
     return insertTemp;
   };

   static async findTempPwd({ email, pwd }){
    const find = `SELECT temp_pwd FROM users WHERE ${isDeleted} AND user_email = ? AND temp_pwd = ?`;
    const [tempPwd, _] = await db.query(find, [email, pwd]);
    return Boolean(tempPwd.length);
  };

  static async validateNewPwd(user_pwd) {
    const loginSchema = joi.object({
      user_pwd: joi.string().required().min(5)
    });
    return loginSchema.validate(user_pwd);
  };


  static async patchNewPwd(user_pwd, user_email){
    const patch = `UPDATE users SET user_pwd = ? WHERE user_email = ? AND ${isDeleted}`;
    const [patchNewPwd, _] = await db.query(patch, [user_pwd, user_email]);
    return patchNewPwd;
  };

};
   
  