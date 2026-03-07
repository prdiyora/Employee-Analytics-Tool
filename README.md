npm init -y > project ID card like adhar card to store all name , script , dependacy ..

npm install express [ webs server] 
pg[ postgres connection] 
cors [Allow frontend to call backend ] 
dotenv  [Secure environment variables]
_______________________________________________________________________

Routes Folder = Manager / URL Manage karse / API endpoints / Phone uthaave ane decide kare
🛣 1️⃣ Routes = Receptionist
📂 employeeRoutes.js

Aa receptionist nu kaam shu?
Customer su mange che → Kon handle karse e decide kare.

Example:
router.get("/", getAllEmployees);

Matlab:

👉 Jo koi /api/employees par aave
Toh receptionist kahe:
“Sir, aa request getAllEmployees chef handle karse.”

Route = 🔀 “Konse request ne kisko aapvi?”
_______________________________________________________________________

Controller Folder = Kitchen / Actual kaam kare / Database query kare / controllers contain the business logic and database operations.

👨‍🍳 2️⃣ Controller = Chef

📂 employeeController.js

Chef nu kaam shu?
Actual kaam karvu.
Database ma jaine data lai ne aavu.

Example:
exports.getAllEmployees = async (req, res) => {
   const result = await pool.query("SELECT * FROM employees");
   res.json(result.rows);
};

Aa chef kare che:

Kitchen (Database) ma jaay
Data banave
Response ma plate ma serve kare

Routes define API endpoints, while controllers contain the business logic and database operations.
_______________________________________________________________________

backend/config/db.js > 👉 Node.js ne PostgreSQL sathe connect karvu bas.
> Database sathe permanent safe connection banavti file

Aa file shu kare che?
👉 Ek permanent gate pass system banave che.

🔥 Real Flow 

Frontend → API
API → Controller
Controller → db.js
db.js → PostgreSQL
PostgreSQL → Data
Data → Back to frontend

What is database pooling?"

You say:

Connection pooling maintains a pool of reusable database connections to improve performance and avoid creating a new connection for every request.
_______________________________________________________________________

backend/server.js =
👉 “Akha backend nu brain / entry gate / traffic police.

🏢 Big Picture Analogy

Socho tamaru backend ek mall che 🏬

express = mall building

routes = alag-alag shops

controllers = shop na staff

database = warehouse

server.js =
👉 Mall nu main gate + manager office.
_______________________________________________________________________

**Deployment (Render)**

- Create a GitHub repository for this project and push the code.
- On Render, create a new **Web Service** and connect it to your GitHub repo.
- Set the **Environment** to `Node`.
- Build command: `npm install`
- Start command: `npm start`
- In Render's service settings, add an environment variable named `DATABASE_URL` and set its value to your external database URL. Do NOT commit this value to the repo.

Example external DB URL (do not commit your real secret):
`postgresql://<username>:<password>@<host>.oregon-postgres.render.com/<database>`

- Optionally set `PORT` to `3000` (Render will provide a port automatically, but the app reads `process.env.PORT`).

Post-deploy checks:
- Open the deployed service URL and visit `/view-employees.html` and the dashboard to confirm data loads.
- Use the following PSQL command locally (replace placeholders with your real values) to connect and verify data:
```bash
PGPASSWORD=<your_db_password> psql -h <host>.oregon-postgres.render.com -U <username> <database>
```

Security notes:
- Never commit secrets like the `DATABASE_URL` into source control. Use Render's dashboard or secret manager to store sensitive environment variables.
