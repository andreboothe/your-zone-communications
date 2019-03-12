const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  email: process.env.GMAIL_EMAIL,
  password: process.env.GMAIL_PASSWORD,
  // port: process.env.PORT
};