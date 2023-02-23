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

  // Event listener for form submission to get a single employee by Employee Number
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