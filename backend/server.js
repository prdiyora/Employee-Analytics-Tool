const express = require("express");
//Express su che? 👉 Node.js ne web server banavva ni library.(Website / API banavva nu engine)

const cors = require("cors");
//CORS = Cross-Origin Resource Sharing | Frontend (localhost:5500) Backend (localhost:5000)
//cors() = permission letter 📄

require("dotenv").config();
//.env file na data ne load karva mate 

const employeeRoutes = require("./routes/employeeRoutes");
// Routes file import kare.
//Routes = receptionist/ trafic manager // call pick department ma transfer karse    
//Controller = chef

const app = express(); // final app banavse 

app.use(cors());  //Frontend ne allow kare backend sathe vaat karva.
app.use(express.json());  //  aa middleware JSON ne samjhe che.

// Routes
app.use("/api/employees", employeeRoutes);
//Jo koi request aave: /api/employees
//Toh ene employeeRoutes file handle karse.
//Example: Frontend call kare: > GET /api/employees

// testing mate jo browser ma lakehlu ave ke server okk to all okk
app.get("/", (req, res) => {
  res.send("Employee Management API Running 🚀");
});



const PORT = process.env.PORT || 5000;
//Jo .env ma PORT hoy toh e use karse nahi hoy toh default 5000.

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
//Aa line actual server start kare. Without this → backend chalatu j nahi.


// Serve frontend static files
// app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

});
