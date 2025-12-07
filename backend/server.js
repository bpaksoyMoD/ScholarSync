const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
const scraperRoutes = require('./routes/scraper');
const emailRoutes = require('./routes/email');
const applicationRoutes = require('./routes/applications');

app.use('/api/deadlines', scraperRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/applications', applicationRoutes);

app.get('/', (req, res) => {
    res.send('ScholarSync Agent Brain is Active 🧠');
});

app.listen(PORT, () => {
    console.log(`Agent Brain running on port ${PORT}`);
});
