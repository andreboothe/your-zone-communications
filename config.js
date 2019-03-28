const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  email: process.env.GMAIL_EMAIL,
  password: process.env.GMAIL_PASSWORD,
  recipient: process.env.RECIPIENT_MAIL,
  client_email: process.env.CLIENT_EMAIL
};