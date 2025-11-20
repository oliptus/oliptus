const serverlessExpress = require('@codegenie/serverless-express');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const { method, url } = req;
    console.log(`[${timestamp}] ${method} ${url}`);
    next();
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    console.log(`[CONTACT] New message from ${name} (${email}): ${subject}`);

    setTimeout(() => {
        res.json({ success: true, message: 'Email sent successfully (simulated)' });
    }, 1000);
});

exports.handler = serverlessExpress({ app });
