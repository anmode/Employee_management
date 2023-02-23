// Define employee data as an array of objects
const employees = [
    {
      employeeNumber: '001',
      adharCardNumber: '123456789012',
      mobileNumber: '9876543210',
      department: 'Marketing',
      address: '123 Main Street'
    },
    {
      employeeNumber: '002',
      adharCardNumber: '234567890123',
      mobileNumber: '8765432109',
      department: 'Sales',
      address: '456 Elm Street'
    },
    {
      employeeNumber: '003',
      adharCardNumber: '345678901234',
      mobileNumber: '7654321098',
      department: 'Finance',
      address: '789 Oak Street'
    }
  ];
  
  // Get the table body element
  const tableBody = document.getElementById('employee-list');
  
  // Loop through the employee data and create a new row for each employee
  employees.forEach(employee => {
    // Create a new row element
    const row = document.createElement('tr');
  
    // Create a cell element for each data point and append it to the row
    const employeeNumberCell = document.createElement('td');
    employeeNumberCell.textContent = employee.employeeNumber;
    row.appendChild(employeeNumberCell);
  
    const adharCardNumberCell = document.createElement('td');
    adharCardNumberCell.textContent = employee.adharCardNumber;
    row.appendChild(adharCardNumberCell);
  
    const mobileNumberCell = document.createElement('td');
    mobileNumberCell.textContent = employee.mobileNumber;
    row.appendChild(mobileNumberCell);
  
    const departmentCell = document.createElement('td');
    departmentCell.textContent = employee.department;
    row.appendChild(departmentCell);
  
    const addressCell = document.createElement('td');
    addressCell.textContent = employee.address;
    row.appendChild(addressCell);
  
    // Append the row to the table body
    tableBody.appendChild(row);
  });
  