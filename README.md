# ScholarSync - AI College Application Agent

ScholarSync is an AI-powered "live-in agent" designed to assist international students with their US college applications. It features an OS-like interface, deadline tracking, essay coaching, and automated email outreach.

## Features

-   **Dashboard**: A central command center with real-time updates on deadlines and emails.
-   **Application Tracker**: Kanban-style board to manage application statuses (Researching, In Progress, Submitted).
-   **Essay Coach**: AI-simulated chat interface for essay feedback and brainstorming.
-   **Student Profile**: Manage your academic profile and get automated college matches.
-   **"Live-in" Agent**: Runs as a desktop application (Electron) with a background Node.js "Brain" for web scraping and automation.

## Prerequisites

-   **Node.js**: Version 18 or higher.
-   **npm**: Included with Node.js.

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/bpaksoyMoD/ScholarSync.git
    cd ScholarSync
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Running the Application

To start the full desktop application (Frontend + Backend + Electron):

```bash
npm run electron
```

This command will:
1.  Start the Vite dev server for the React frontend.
2.  Launch the Electron desktop window.
3.  Spawn the Node.js backend server (The "Brain") in the background.

## Development

If you want to run the web interface only (without Electron):

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

-   `src/`: React frontend code.
-   `backend/`: Node.js server code (Scraper, Emailer).
-   `electron/`: Electron main and preload scripts.
