const baseURL = 'http://localhost:3000/api/employees';

// Get all employees and display them on the page
function getAllEmployees() {
  fetch(baseURL)
    .then(response => response.json())
    .then(data => {
      const employeeList = document.getElementById('employee-list');
      employeeList.innerHTML = '';
      data.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${employee.employeeNumber}</td>
          <td>${employee.adharCardNumber}</td>
          <td>${employee.mobileNumber}</td>
          <td>${employee.department}</td>
          <td>${employee.address}</td>
          <td>
            <button onclick="editEmployee(${employee.employeeNumber})">Edit</button>
            <button onclick="deleteEmployee(${employee.employeeNumber})">Delete</button>
          </td>
        `;
        employeeList.appendChild(row);
      });
    })
    .catch(error => console.error(error));
}



// Add a new employee to the database
function addEmployee(employee) {
  fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      getAllEmployees();
    })
    .catch(error => console.error(error));
}

function updateEmployee(employeeNumber, updatedEmployee) {
  fetch(`${baseURL}/${employeeNumber}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedEmployee)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      getAllEmployees();
    })
    .catch(error => console.error(error));
}


function deleteEmployee(employeeNumber) {
  fetch(`${baseURL}/${employeeNumber}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Failed to delete employee');
      }
    })
    .then(data => {
      console.log(data);
      getAllEmployees();
    })
    .catch(error => console.error(error));
}







function getEmployeeByNumber(employeeNumber) {
  fetch(`${baseURL}/${employeeNumber}`)
    .then(response => response.json())
    .then(employee => {
      const employeeList = document.getElementById('employee-list');
      employeeList.innerHTML = '';
      const listItem = document.createElement('li');
      listItem.textContent = `${employee.employeeNumber} - ${employee.department} - ${employee.mobileNumber}`;
      employeeList.appendChild(listItem);
    })
    .catch(error => console.error(error));
}


// Event listener for form submission to add a new employee
const addEmployeeForm = document.getElementById('add-employee-form');
addEmployeeForm.addEventListener('submit', event => {
  event.preventDefault();
  const employee = {
    employeeNumber: addEmployeeForm.elements['employee-number'].value,
    adharCardNumber: addEmployeeForm.elements['adhar-card-number'].value,
    mobileNumber: addEmployeeForm.elements['mobile-number'].value,
    department: addEmployeeForm.elements['department'].value,
    address: addEmployeeForm.elements['address'].value
  };
  addEmployee(employee);
  addEmployeeForm.reset();
});

// Event listener for form submission to update an existing employee
const updateEmployeeForm = document.getElementById('update-employee-form');
updateEmployeeForm.addEventListener('submit', event => {
  event.preventDefault();
  const employeeNumber = updateEmployeeForm.elements['update-employee-number'].value;
  const updatedEmployee = {
    employeeNumber: employeeNumber,
    adharCardNumber: updateEmployeeForm.elements['update-adhar-card-number'].value,
    mobileNumber: updateEmployeeForm.elements['update-mobile-number'].value,
    department: updateEmployeeForm.elements['update-department'].value,
    address: updateEmployeeForm.elements['update-address'].value
  };
  updateEmployee(employeeNumber, updatedEmployee);
  updateEmployeeForm.reset();
});


// Event listener for form submission to delete an existing employee
const deleteEmployeeForm = document.getElementById('delete-employee-form');
deleteEmployeeForm.addEventListener('submit', event => {
  event.preventDefault();
  const id = deleteEmployeeForm.elements['delete-employee-number'].value;
  console.log(`Deleting employee with ID ${id}`);
  deleteEmployee(id);
  deleteEmployeeForm.reset();
});


// Event listener for form submission to get a single employee by Number
const getEmployeeByIdForm = document.getElementById('get-employee-by-id-form');
getEmployeeByIdForm.addEventListener('submit', event => {
event.preventDefault();
const id = getEmployeeByIdForm.elements['search-employee-number'].value;
console.log(`Searching employe with ID ${id}`);
getEmployeeByNumber(id);
getEmployeeByIdForm.reset();
});

// Initial display of all employees
getAllEmployees();
