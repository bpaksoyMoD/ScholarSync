const express = require('express');
const router = express.Router();
const emailService = require('../services/mailer');

router.post('/send', async (req, res) => {
    const { to, subject, body } = req.body;

    if (!to || !subject || !body) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await emailService.sendEmail(to, subject, body);

    if (result.success) {
        res.json(result);
    } else {
        res.status(500).json(result);
    }
});

module.exports = router;
