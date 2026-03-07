// Fetch dashboard statistics from backend
async function loadDashboard() {
    try {
        const response = await fetch("/api/employees/stats");
        const data = await response.json();

        document.getElementById("totalEmployees").innerText = data.totalEmployees;
        document.getElementById("totalPayroll").innerText = "₹ " + data.totalPayroll;
        document.getElementById("totalDepartments").innerText = data.totalDepartments;

    } catch (error) {
        console.error("Error loading dashboard:", error);
    }
}

// Run when page loads
loadDashboard();