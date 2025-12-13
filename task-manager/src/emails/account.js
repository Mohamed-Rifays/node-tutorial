import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});


/*
const mailOption = {
    from: process.env.GMAIL_USER,
    to: 'cse261058@saranathan.ac.in',
    subject: 'Welcome to Task Manager App',
    text: 'Thanks for joining in Task Manager App. Let me know how you get along with the app.'
};
*/

export const sendWelcomeEmail = (email,name) => {
transporter.sendMail({ 
    from: process.env.GMAIL_USER,
    to: email,
    subject: `Welcome to Task Manager App, ${name}!`,
    text: `Thanks ${name} for joining in Task Manager App. Let me know how you get along with the app.`}, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.response);

});   
};

export const sendCancellationEmail = (email,name) => {
    transporter.sendMail({ 
        from: process.env.GMAIL_USER,   
        to: email,
        subject: `Sorry to see you go, ${name}!`,
        text: 'Goodbye! We hope to see you back sometime soon.'}, (error, info) => {    
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.response);

    }
    );   
    };