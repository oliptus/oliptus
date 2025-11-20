const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple Audit Logging Middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const { method, url, ip } = req;
    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
    next();
});

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Log the contact attempt
    console.log(`[CONTACT] New message from ${name} (${email}): ${subject}`);

    // TODO: Configure Nodemailer with real credentials
    // For now, we'll simulate a successful email send

    /* 
    // Example Nodemailer setup:
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    */

    // Simulate processing delay
    setTimeout(() => {
        res.json({ success: true, message: 'Email sent successfully (simulated)' });
    }, 1000);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
