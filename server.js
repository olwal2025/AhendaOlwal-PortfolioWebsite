const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-email-password'
    }
});

app.post('/send-message', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER || 'your-email@gmail.com',
            subject: `New message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).send('Message sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending message. Please try again later.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
