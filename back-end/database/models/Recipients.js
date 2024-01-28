import db from '../config/db.js';
import joi from 'joi';

const isDeleted = "deleted_at IS NULL";
const isUser = "user_id = ?";

export default class Recipients {
    static async isValueValid(data) {
        const recipientsSchema = joi.object({
            user_id: joi.number(),
            first_name: joi.string().required().min(1).max(50),
            last_name: joi.string().required().min(1).max(50),
            email: joi.string().required().email(),
            birthday: joi.string().required(),
            style: joi.string()
        });
        return recipientsSchema.validate(data);
    };

    static async saveToDB(recipient_data) {
        const insert = 'INSERT INTO `recipients` SET ?';
        const addRecipient = await db.query(insert, [recipient_data]);
        return addRecipient;
    };

    static async findAll(user_id, orderBy, order) {
        const get = `SELECT * FROM recipients WHERE ${isUser} AND ${isDeleted} ORDER BY ${orderBy} ${order}`;
        const [getAll, _] = await db.query(get, [user_id]);
        return getAll;
    };

    static async findColumns() {
        const describe = "DESCRIBE `recipients`";
        const [columns, _] = await db.execute(describe);
        return columns;
    };

    static async findUserId(token) {
        console.log("token in models######", token);
        const find = `SELECT recipients.user_id 
        FROM recipients INNER JOIN users 
        ON users.id = recipients.user_id WHERE users.token = ?`;
        const [findId, _] = await db.query(find, [token]);
        return findId;
    }

    static async findSearchedRecipients(filterBy, by, searchQuery, user_id) {
        const searched = `SELECT ${filterBy} FROM recipients WHERE ${isUser} AND ${isDeleted} AND ${by} LIKE ?`;
        const [searchedData, _] = await db.query(searched, [user_id, `%${searchQuery}%`]);
        return searchedData;
    };

    static async validatePatch(data) {
        const patchSchema = joi.object({
            user_id: joi.number(),
            first_name: joi.string().min(1).max(50),
            last_name: joi.string().min(1).max(50),
            email: joi.string().email(),
            birthday: joi.string(),
            style: joi.string()
        });
        return patchSchema.validate(data);
    };


    static async patchRecipient(id, body) {
        const patch = Object.entries(body).map(([key, value]) => {
            //const formattedValue = db.escape(value);
            value = typeof value === "string" ? `"${value}"` : `${value}`;
            return `${key} = ${value}`;
        }).join(", ");
        console.log("patch", patch);
        const updateInfo = `UPDATE recipients SET ${patch} WHERE id = ? AND ${isDeleted}`;
        const [updatedResults, _] = await db.query(updateInfo, [id]);
        return updatedResults;
    };

    static async softDelete(user_id, id) {
        const soft = `UPDATE recipients SET deleted_at = CURRENT_TIMESTAMP WHERE ${isUser} AND ${isDeleted} AND id = ?`;
        const [softDeleted, _] = await db.query(soft, [user_id, id]);
        return softDeleted;
    };
};