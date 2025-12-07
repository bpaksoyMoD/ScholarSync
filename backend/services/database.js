const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../scholarsync.db');
const db = new Database(dbPath, { verbose: console.log });

// Initialize Schema
function initDb() {
    const createApplicationsTable = `
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      university TEXT NOT NULL,
      status TEXT DEFAULT 'Researching',
      deadline TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

    const createDeadlinesTable = `
    CREATE TABLE IF NOT EXISTS deadlines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      university TEXT NOT NULL,
      date TEXT NOT NULL,
      source_url TEXT,
      scanned_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

    const createLogsTable = `
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      details TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

    db.exec(createApplicationsTable);
    db.exec(createDeadlinesTable);
    db.exec(createLogsTable);
    console.log('Database initialized successfully.');
}

initDb();

module.exports = {
    db,
    // Helper methods
    getApplications: () => db.prepare('SELECT * FROM applications').all(),
    addApplication: (app) => db.prepare('INSERT INTO applications (university, status, deadline) VALUES (@university, @status, @deadline)').run(app),
    updateApplicationStatus: (id, status) => db.prepare('UPDATE applications SET status = ? WHERE id = ?').run(status, id),

    addDeadline: (deadline) => db.prepare('INSERT INTO deadlines (university, date, source_url) VALUES (@university, @date, @source_url)').run(deadline),
    getDeadlines: () => db.prepare('SELECT * FROM deadlines ORDER BY date ASC').all(),

    logAction: (action, details) => db.prepare('INSERT INTO logs (action, details) VALUES (?, ?)').run(action, details)
};
