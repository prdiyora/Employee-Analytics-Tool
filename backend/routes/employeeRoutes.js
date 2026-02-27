// Aa file = 🚦 Traffic Police

const express = require("express");
// 👉 Node.js ne web server banavva ni library.(Website / API banavva nu engine) // library mathi route lai lese 

const router = express.Router();


//Router = Express ni mini app.
//app = Main highway || router = Side road (employees mate)
//Aa router specifically employees related routes handle kare.



const {
  getAllEmployees,
  getDashboardStats,
   addEmployee,
   deleteEmployee,
    aiQuery
} = require("../controllers/employeeController");
//Controller mathi functions lai aave.
// controler = manager [ aa badha kam karse database sathe mali ne]
// route = receptionist [ aaa kese kayu kam kone devanu chhe]

// GET all employees
router.get("/", getAllEmployees);

// GET dashboard stats
router.get("/stats", getDashboardStats);

router.post("/", addEmployee);
// post data 

router.delete("/:id", deleteEmployee);
//delete data 

router.post("/ai/query", aiQuery);
// ai data 

module.exports = router;
//Aa router ne export kare. Jethi server.js ene use kari shake:

//What does express.Router() do?”
//express.Router() creates modular route handlers that help organize related 
// endpoints into separate files.