import db from '../config/db.js';
import joi from 'joi';
import JWT from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const isDeleted = 'deleted_at IS NULL';

class Users {
  static async validateInfo(user_data) {
    const loginSchema = joi.object({
      user_email: joi.string().required().email().min(11).max(40),
      user_name: joi.string().required().min(5).max(150),
      user_pwd: joi.string().required().min(5),
    });
    return loginSchema.validate(user_data);
  };

  // ------------- || SIGN-UP || ------------- \\

  static async saveToDB(body) {
    const INSERT = 'INSERT INTO users SET ?';
      const [addUser, _] = await db.query(INSERT, [body]);
      return addUser;
    
  };

  // ~~~~~~~~~~~~~~~~~ \\ LOG -IN // ~~~~~~~~~~~~~~~~~~ \\
  static async validateLoginInfo(user_data) {
    const loginSchema = joi.object({
      user_email: joi.string().required().email().min(11).max(40),
      user_pwd: joi.string().required().min(5)
    });
    return loginSchema.validate(user_data);
  }

  static async getUserByEmail(user_email) {
    const getByEmail = `SELECT * FROM users WHERE ${isDeleted} AND user_email = ?`;
    return await db.query(getByEmail, [user_email]);
  };

  static async generateToken({ user_email, user_name }) {
    return JWT.sign(
      {
        user_email: user_email,
        user_name: user_name
      },
      process.env.JWT_SECRET
    );
  };

  //Auth.
  static async verifyId(id, token) {
    const getByEmail = `SELECT * FROM users WHERE ${isDeleted} AND id = ? AND token = ?`;
    return await db.query(getByEmail, [id, token]);
  };

  // PATCH
  static async patchUser(id, body){
    const patch = Object.entries(body).map(entry => {
      let [key, value] = entry;
      value = typeof value === 'string' ? `"${value}"` : `${value}`;
      return `${key} = ${value}`;
    }).join(", ");
    console.log(patch);
    const update = `UPDATE users SET ${patch} WHERE ${isDeleted} AND id = ?`;
    const [patchedUser, _] = await db.query(update, [id]);
    return patchedUser;
  };
};


export default Users;