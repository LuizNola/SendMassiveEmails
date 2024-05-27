import nodemailer from 'nodemailer';
require('dotenv').config();


const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const EMAIL_USER = process.env.EMAIL_USER; 
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD; 

const transportOptions = {
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
};


const transporter = nodemailer.createTransport(transportOptions);

export default transporter;