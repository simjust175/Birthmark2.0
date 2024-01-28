import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const lang = "en";

const loadContent = (firstName, lastName, user_name, color) => {
    const content = fs.readFileSync(
        path.resolve(__dirname, `../cardCreation/Assets/templates/b-day_${color}_en.docx`),
        "binary"
    );
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    doc.render({ firstName, lastName });

    return doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
    });
};


const renderCard = (firstName, lastName, user_name, color) => {
    const buf = loadContent(firstName, lastName, user_name, color);
    const outputFolder = "./createdDocuments";
    console.log("in render cards", outputFolder);
    const outputPath = path.join(__dirname, outputFolder);
    fs.writeFileSync(path.resolve(outputPath, `happyB-day${firstName}.docx`), buf);
    console.log(`File for ${firstName} from ${user_name} rendered`);
}

//\/\/\/\/ || Test function || \/\/\/\/\//
//renderCard("david", "goliath", "gold");


export default renderCard;