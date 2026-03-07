// Load employees
async function loadEmployees() {
    const response = await fetch("/api/employees");
    const data = await response.json();

    const table = document.getElementById("employeeTable");
    table.innerHTML = "";

    data.forEach(emp => {
        const row = `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.first_name} ${emp.last_name}</td>
                <td>${emp.email}</td>
                <td>₹ ${emp.salary}</td>
                <td>${emp.department}</td>
                <td>${emp.status}</td>
                <td>
                    <button class="delete-btn" onclick="deleteEmployee(${emp.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// Delete employee
async function deleteEmployee(id) {
    if(confirm("Are you sure you want to delete?")) {
        await fetch(`/api/employees/${id}`, {
            method: "DELETE"
        });
        loadEmployees();
    }
}

// Search filter
document.getElementById("searchInput").addEventListener("keyup", function() {
    const filter = this.value.toLowerCase();
    const rows = document.querySelectorAll("#employeeTable tr");

    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(filter) 
            ? "" 
            : "none";
    });
});

loadEmployees();