Employee Management System

This is a small Node.js app that shows and manages employees using PostgreSQL.

Quick overview
- Backend: `server.js`, Express, routes in `backend/routes`, controllers in `backend/controllers`.
- Database: PostgreSQL. Schema and sample data in `database.sql`.
- Frontend: static pages in `public/` and JS in `js/`.

Setup (local)
1. Copy `.env.example` to `.env` and set `DATABASE_URL`.
2. Install dependencies:
```bash
npm install
```
3. Create database tables and seed departments:
```bash
psql "<your_database_url>" -f database.sql
```
4. Start the app:
```bash
npm start
```
5. Open `http://localhost:3000` in your browser.

Notes about `.txt` files
- All `.txt` files (like notes or local credentials) are ignored by Git via `.gitignore`.
- This keeps sensitive or temporary text files out of the repository.

Deploy (Render)
- Push this repo to GitHub.
- Create a Web Service on Render and connect the repo.
- Build command: `npm install`
- Start command: `npm start`
- In Render settings, set the `DATABASE_URL` environment variable to your external DB URL.

Security
- Do NOT commit secrets (like the real `DATABASE_URL`) to the repo.
- Use Render's environment variables to store secrets.

If you want, I can:
- Run the SQL in your provided Render Postgres URL.
- Help set up the Render service and environment variables.

