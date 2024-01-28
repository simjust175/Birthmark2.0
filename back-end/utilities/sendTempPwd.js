import * as nodemailer from 'nodejs-nodemailer-outlook';
import { config } from 'dotenv';
config()

// const logoPath = path.join(__dirname, "../");
const tempHtml = (temp_pwd) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Password Reset</title>
  </head>
  <body>
    <table style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <tr>
        <td align="center" style="padding-bottom: 20px;">
          <img src="logo.png" alt="Logo" style="max-width: 200px;">
        </td>
      </tr>
      <tr>
        <td align="center" style="padding-bottom: 20px;">
          <h1>Password Reset</h1>
        </td>
      </tr>
      <tr>
        <td>
          <p>Dear User,</p>
          <p>You have requested a password reset for your account. Please use the temporary password below to log in and reset your password.</p>
          <p>Temporary Password: <strong>${temp_pwd}</strong></p>
          <p>Once logged in, you will be prompted to set a new password.</p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>Thank you!</p>
        </td>
      </tr>
    </table>
  </body>
  </html>`
} 

export default function sendEmail(user_email, temp_pwd) {
  console.log('Email sending has started...');
  nodemailer.sendEmail({
    auth: {
      user: process.env.OUTLOOK_ADDR,
      pass: process.env.OUTLOOK_PASS
    },
    from: process.env.OUTLOOK_ADDR,
    to: `${user_email}`,
    subject: `Your temporary password`,
    html: tempHtml(temp_pwd),
    onError: (err) => console.log(err),
    onSuccess: (message) => console.log(`Message successfully sent: ${JSON.stringify(message.envelope)}`)
  });
};


