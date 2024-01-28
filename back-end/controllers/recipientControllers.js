import RecipientServices from '../services/RecipientServices.js';

export default class RecipientsControllers {
    static async postRecipient({ body }, res) {
        try {
            const newRecipient = await RecipientServices.postRecipientService(body);
            if (!newRecipient) return res.status(400).json({ msg: 'Error in RecipientServices/postRecipientService()' });;
            res.status(200).json({ Congratulations: `New recipient ${body.first_name} added successfully`, newRecipient });
        } catch (error) {
            res.status(500).json({ Error: `Error in RecipientServices/postRecipientService(): ${error.message}` });
        };
    };
     
    //get all
    static async getAll(req, res) {
        try {
            const getRecipient = await RecipientServices.getAllService(req);
            if(!getRecipient) return res.status(404).json({msg: "Error in getting recipients"})
            console.log({ Count: getRecipient.getAll.length});
            res.status(201).json({ Count: getRecipient.getAll.length, recipients: getRecipient.getAll, columns: getRecipient.getColumns });
        } catch (error) {
            res.status(500).json({ Error: `Error in RecipientServices/getAllService(): ${error.message}` });
        }

    };

    //Search
    static async getSearched(req, res) {
        try {
            const searchResults = await RecipientServices.searchService(req);
            if(searchResults < 1) return res.status(404).json({oops: "Seems that no one matches your search, please try again"});
            res.status(200).json({searchResults});
        } catch (error) {
            res.status(500).json({ Error: `Error in RecipientServices/searchService(): ${error.message}` });
        }
    };


    //soft delete 
    static async deleteRecipient(req, res) {
        try {
            const deleteRecipient = await RecipientServices.deleteRecipientService(req);
            if (!deleteRecipient) return res.status(404).json({ msg: 'Error in RecipientControllers/deleteRecipient()' });
            console.log(deleteRecipient);
            res.status(200).json({ Congratulations: `recipient deleted successfully`});
        } catch (error) {
            res.status(500).json({ Error: `Error in RecipientServices/deleteRecipientService(): ${error.message}` });
        };
    };

    //PATCH
    static async patchRecipient(req, res) {
        try {
            const patchRecipient = await RecipientServices.patchRecipientService(req);
            if (!patchRecipient) return res.status(400).json({ msg: 'Error in RecipientControllers/patchRecipient()' });;
            res.status(200).json({ Congratulations: `recipient patched successfully`});
        } catch (error) {
            res.status(500).json({ Error: `Error in RecipientServices/patchRecipientService(): ${error.message}` });
        };
    };
};