const express = require('express');
const router = express.Router();
const db = require('../services/database');

// GET all applications
router.get('/', (req, res) => {
    try {
        const apps = db.getApplications();
        res.json({ success: true, data: apps });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST new application
router.post('/', (req, res) => {
    const { university, status, deadline } = req.body;
    if (!university) {
        return res.status(400).json({ error: 'University name is required' });
    }

    try {
        const result = db.addApplication({ university, status, deadline });
        res.json({ success: true, id: result.lastInsertRowid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PATCH update status
router.patch('/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        db.updateApplicationStatus(id, status);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
