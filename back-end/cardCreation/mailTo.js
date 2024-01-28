import nodeoutlook from "nodejs-nodemailer-outlook";
import path from "path";
import { config } from 'dotenv';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config();

const logoPath = path.join(__dirname, "./Assets/logo/bird_logo.svg");
const html = ` <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
      padding: 20px;
    }

    h1 {
      color: #333333;
      font-size: 28px;
      margin-bottom: 20px;
    }

    p {
      color: #666666;
      font-size: 16px;
      margin-bottom: 10px;
    }

    img {
      max-width: 200px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h1>Happy Birthday!!</h1>
  <p>Sent using BirthMark</p>
  <img src="${logoPath}" alt="BIRTHMARK">
</body>
</html>`;

const sendMail = (email, firstName) => {
    console.log("sending email...");
    nodeoutlook.sendEmail({
        auth: {
            user: process.env.OUTLOOK_ADDR,
            pass: process.env.OUTLOOK_PASS
        },
        from: process.env.OUTLOOK_ADDR,
        to: `${email}`,
        subject: `Happy Birthday!! ${firstName}`,
        html: html,
        text: 'Happy Birthday!',
        attachments:[{
            filename: `happyB-day${firstName}.docx`,
            path: `./createdDocuments/happyB-day${firstName}.docx`
        }],
        onError: (err) => console.log(err),
        onSuccess: (message) => console.log(`Message successfully sent: ${JSON.stringify(message.envelope)}`)
    }
    
    );
}

// <<<<<~~~~~~>>>>> Test function <<<<<~~~~~~>>>>> //
//sendMail("bunim175@gmail.com", "david");

export default sendMail;