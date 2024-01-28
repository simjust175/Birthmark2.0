import { TokenListInstance } from "twilio/lib/rest/api/v2010/account/token.js";
import Recipients from "../database/models/Recipients.js";

class RecipientServices {
    //Post
    async postRecipientService(body) {
        try {
            const isValid = await Recipients.isValueValid(body);
            if (isValid.error) throw new Error(isValid.error.details[0].message);
            const newRecipient = await Recipients.saveToDB(body);
            if (!newRecipient) return null;
            return newRecipient;
        } catch (error) {
            throw new Error(error);
        };
    };

    //verify user_id
    async verifyUserId(token) {
        const user = await Recipients.findUserId(token);
        if (!user) return false
        return user[0].user_id;
    }

    //Get all
    async getAllService({ query, params, headers }) {
       let token = headers['authorization'];
        let user_token = token.replace('Bearer ', '');
        const user_id = await this.verifyUserId(user_token)

        try {
            const orderBy = query.orderBy || 'last_name';
            const order = query.order || 'ASC';
            const getAll = await Recipients.findAll(user_id, orderBy, order);
            const getColumns = await Recipients.findColumns()
            if (!getAll || !getColumns) return null;
            return { getAll, getColumns };
        } catch (error) {
            throw new Error(error);
        };
    };

    //search recipient
    async searchService({ query, params }) {
        let filterBy = query.filter || "*";
        let by = query.by || "last_name";
        let searchQuery = query.q;
        try {
            const searchResults = await Recipients.findSearchedRecipients(filterBy, by, searchQuery, params.user_id);
            return searchResults;
        } catch (error) {
            throw new Error(error);
        };
    };

    //delete
    async deleteRecipientService({ params: { id }, headers }) {
        let token = headers['authorization'];
        let user_token = token.replace('Bearer ', '');
        const user_id = await this.verifyUserId(user_token);
        if (!user_id) return null;
        try {
            const deleteRecipient = await Recipients.softDelete(user_id, id);
            if (!deleteRecipient) return null;
            return deleteRecipient;
        } catch (error) {
            throw new Error(error);
        }
    };

    //patch
    async patchRecipientService({ body, params }) {
        const isPatchValid = await Recipients.validatePatch(body);
        if (isPatchValid.error) {
            console.log(isPatchValid.error.details);
            return null;
        }
        try {
            const patchRecipient = await Recipients.patchRecipient(params.id, body);
            if (!patchRecipient) return null;
            return patchRecipient;
        } catch (error) {
            throw new Error(error);
        }
    }


}

export default new RecipientServices();