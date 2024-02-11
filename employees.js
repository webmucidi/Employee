function search() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    fetch('employees.json')
        .then(response => response.json())
        .then(data => {
            const filteredEmployees = data.filter(employee =>
                employee.emplyName.toLowerCase().includes(searchTerm) ||
                employee.emplySurname.toLowerCase().includes(searchTerm)
            );

            filteredEmployees.forEach(employee => {
                const div = document.createElement('div');
                div.innerHTML = `<p>${employee.emplyName} ${employee.emplySurname} - Salary: ${employee.emplySalary}, Level: ${employee.emplyLevel}</p>`;
                searchResults.appendChild(div);
            });
        });
}

function addEmployee() {
    const empName = document.getElementById('empName').value;
    const empSurname = document.getElementById('empSurname').value;
    const empSalary = document.getElementById('empSalary').value;
    const empLevel = document.getElementById('empLevel').value;

    const newEmployee = {
        emplyName: empName,
        emplySurname: empSurname,
        emplySalary: empSalary,
        emplyLevel: empLevel
    };

    fetch('employees.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
    }).then(() => {
        alert('Employee added successfully!');
        location.reload(); 
    }).catch(error => {
        console.error('Error:', error);
        alert('An error occurred while adding the employee.');
    });
}
