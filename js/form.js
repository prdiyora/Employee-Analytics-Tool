document.getElementById("employeeForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const employee = {
        first_name: document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        salary: document.getElementById("salary").value,
        department_id: document.getElementById("department").value
    };

    const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });

    if(response.ok) {
        alert("Employee Added Successfully!");
        window.location.href = "view-employees.html";
    } else {
        alert("Error adding employee");
    }
});