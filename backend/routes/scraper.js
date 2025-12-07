const express = require('express');
const router = express.Router();
const scraperService = require('../services/scraper');

router.post('/scan', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const data = await scraperService.fetchDeadlines(url);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
