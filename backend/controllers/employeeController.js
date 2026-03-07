const pool = require("../config/db");

// =============================
// GET ALL EMPLOYEES
// =============================

// asysc jya sudhi all data nai ave tya sudhi wait karse 
exports.getAllEmployees = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.id,
             e.first_name,
             e.last_name,
             e.email,
             e.salary,
             e.status,
             d.name AS department
      FROM employees e
      LEFT JOIN departments d
      ON e.department_id = d.id
      ORDER BY e.id DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// =============================
// DASHBOARD STATS
// =============================
exports.getDashboardStats = async (req, res) => {
    try {
        const totalEmployees = await pool.query("SELECT COUNT(*) AS count FROM employees");

        const totalPayroll = await pool.query("SELECT COALESCE(SUM(salary), 0) AS sum FROM employees");

        const totalDepartments = await pool.query("SELECT COUNT(*) AS count FROM departments");

        res.status(200).json({
            totalEmployees: Number(totalEmployees.rows[0].count),
            totalPayroll: Number(totalPayroll.rows[0].sum),
            totalDepartments: Number(totalDepartments.rows[0].count),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// =============================
// ADD NEW EMPLOYEE
// =============================
exports.addEmployee = async (req, res) => {
    try {
        const { first_name, last_name, email, salary, department_id } = req.body;

        const result = await pool.query(
            `INSERT INTO employees 
            (first_name, last_name, email, salary, department_id) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [first_name, last_name, email, salary, department_id]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding employee" });
    }
};

// =============================
// DELETE EMPLOYEE
// =============================
exports.deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            "DELETE FROM employees WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting employee" });
    }
};

// =============================
// SMART HR ASSISTANT
// =============================
exports.aiQuery = async (req, res) => {
    try {
        const question = req.body.question.toLowerCase();

        // TOTAL EMPLOYEES
        if (question.includes("total employees")) {
            const result = await pool.query("SELECT COUNT(*) FROM employees");
            return res.json({
                answer: `Total employees are ${result.rows[0].count}.`
            });
        }

        // TOTAL PAYROLL
        if (question.includes("total payroll") || question.includes("salary total")) {
            const result = await pool.query("SELECT SUM(salary) FROM employees");
            return res.json({
                answer: `Total payroll is ₹ ${result.rows[0].sum}.`
            });
        }

        // HIGHEST SALARY
        if (question.includes("highest salary")) {
            const result = await pool.query(
                "SELECT first_name, last_name, salary FROM employees ORDER BY salary DESC LIMIT 1"
            );
            const emp = result.rows[0];
            return res.json({
                answer: `${emp.first_name} ${emp.last_name} has the highest salary of ₹ ${emp.salary}.`
            });
        }

        // DEPARTMENT COUNT
        if (question.includes("department count")) {
            const result = await pool.query("SELECT COUNT(*) FROM departments");
            return res.json({
                answer: `There are ${result.rows[0].count} departments.`
            });
        }

        // EMPLOYEES IN DEPARTMENT
        if (question.includes("engineering")) {
            const result = await pool.query(`
                SELECT COUNT(*) 
                FROM employees e
                JOIN departments d ON e.department_id = d.id
                WHERE d.name ILIKE 'Engineering'
            `);
            return res.json({
                answer: `Engineering department has ${result.rows[0].count} employees.`
            });
        }

        // FALLBACK
        return res.json({
            answer: "I can answer HR-related queries like payroll, employee count, highest salary, and department insights."
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "AI Assistant Error" });
    }
};