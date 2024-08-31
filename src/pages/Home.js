import React, { useState, useEffect,Link} from 'react';
import AddEmployeeModal from './AddEmployeeModal';
import EmployeeTable from './EmployeeTable';
import DeletedEmployeeTable from './DeletedEmployeeTable';
import HomeStyle from './HomeStyle.css';
// import EmployeeTableStyle from './EmployeeTableStyle.css';


const Home =() => {
  const [employees, setEmployees] = useState([]);
  const [deletedEmployees, setDeletedEmployees] = useState([]);
  const [setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
 

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    const storedDeletedEmployees = JSON.parse(localStorage.getItem('deletedEmployees')) || [];
    setEmployees(storedEmployees);
    setDeletedEmployees(storedDeletedEmployees);
  }, []);

 useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('deletedEmployees', JSON.stringify(deletedEmployees));
  }, [deletedEmployees]);

  const handleSave = (newEmployee) => {
    if (editingEmployee) {
      setEmployees(employees.map(emp => (emp.id === editingEmployee.id ? newEmployee : emp)));
      setEditingEmployee(null);
    } else {
      setEmployees([...employees, newEmployee]);
    }
    setShowModal(false);
  };
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const employeeToDelete = employees.find(employee => employee.id === id);
    if (employeeToDelete) {
      setEmployees(employees.filter(employee => employee.id !== id));
      setDeletedEmployees([...deletedEmployees, employeeToDelete]);
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredEmployees = employees.filter(employee =>
    employee.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div className="HomeNavBar">
    <div clasname="CompanyName">
    <a href="/Home"><h1>ERStaff</h1></a>
    </div>
        
        <div className="Button2">
          <a href='/Login'>
          <button>LOG OUT</button>
          </a>
        

        </div>
        
        <div className="CompanyLogo"><img src="Applogo.png" alt=''></img></div>
  </div>
    <div className="Wrapper">
    <div className="Header">
      <h2>WELCOME.</h2>
      <p>Design and Manage employees effeciently. </p>
    </div>
    <div className="MainChild">
      <div className="TopBar">
      <div className="container"></div>
      
      <div className="MiddleBar"></div>
      


      <div className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Employee ID"
          value={searchQuery}
          onChange={handleSearchChange}
          className="form-control mt-3 mb-3"
        />
      </div>
      <EmployeeTable employees={filteredEmployees} handleEdit={handleEdit} handleDelete={handleDelete} />
      <button onClick={() => setShowModal(true)}>Add Employee</button>
      {showModal && (
        <AddEmployeeModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          editingEmployee={editingEmployee}
        />
      )}
      <div>
      <DeletedEmployeeTable deletedEmployees={deletedEmployees} />

    </div>

    <div className="Footer">
    <a>
        <p>View Former Employees.</p>
      </a>
</div>

  </div>
  
  </div>
  <div className="MainFooter"><p>Media and Graphics Prince Mashumu 2024</p></div>
    
</div>
 </div>
  </>
  
  );
}

export default Home

