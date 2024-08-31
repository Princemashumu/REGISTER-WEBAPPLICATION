import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AddEmployeeModal from '../pages/AddEmployeeModal';
import EmployeeTable from '../pages/EmployeeTable';
import DeletedEmployeeTable from '../pages/DeletedEmployeeTable';

// Styled components for the layout
const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 15px 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height:50px;
`;

const CompanyName = styled.div`
  color: red;
  font-size: 1.5em;
  font-weight: bold;
`;

const CompanyLogo = styled.div`
  img {
    height: 50px;
    width: auto;
  }
`;

const LogoutButton = styled.button`
  background-color: #f44336; /* Red color */
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c62828; /* Darker red on hover */
  }
`;

const Wrapper = styled.div`
  margin-top: 100px; /* Adjusted for fixed NavBar */
  padding: 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h2 {
    color: #004d40;
    font-size: 2em;
  }

  p {
    color: #555;
    font-size: 1.2em;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #777;
`;

const MainFooter = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #777;
`;

const SocMedContainer = styled.p`
  text-align: center;
  margin: 20px 0;

  a {
    margin: 0 10px;
    display: inline-block;
  }

  img {
    vertical-align: middle;
  }
`;
const button = styled.button`
  background-color: #4caf50; /* Green color */
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin: 10px 0; /* Adds margin to the button */

  &:hover {
    background-color: #388e3c; /* Darker green on hover */
  }

  &:focus {
    outline: none;
  }

  &:active {
    background-color: #2c6b2f; /* Even darker green on click */
  }
`;
const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [deletedEmployees, setDeletedEmployees] = useState([]);
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
 // Inline styles for the button
 const buttonStyle = {
  backgroundColor: '#4caf50', /* Green color */
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  fontSize: '1em',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
  margin: '10px' /* Optional: add some margin */
};

// Hover effect needs JavaScript; it won't work with inline styles alone
const handleMouseOver = (e) => {
  e.target.style.backgroundColor = '#388e3c'; /* Darker green */
};

const handleMouseOut = (e) => {
  e.target.style.backgroundColor = '#4caf50'; /* Green color */
};
  return (
    <>
      <NavBar>
        <CompanyName>
          <Link to="/Home" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>ERStaff</h1>
          </Link>
        </CompanyName>

        <LogoutButton>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            LOG OUT
          </Link>
        </LogoutButton>

        <CompanyLogo>
          <img src="Applogo.png" alt='Company Logo' />
        </CompanyLogo>
      </NavBar>

      <Wrapper>
        <Header>
          <h2>WELCOME.</h2>
          <p>Design and Manage employees efficiently.</p>
        </Header>

        <div className="MainChild">
          <div className="TopBar">
            <div className="container">
              <input
                type="text"
                placeholder="Search by Employee ID"
                value={searchQuery}
                onChange={handleSearchChange}
                className="form-control mt-3 mb-3"
              />
            </div>

            <EmployeeTable employees={filteredEmployees} handleEdit={handleEdit} handleDelete={handleDelete} />
            <button
        style={buttonStyle}
        onClick={() => setShowModal(true)}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Add Employee
      </button>
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

            <Footer>
              <Link to="/DeletedEmployees" style={{ textDecoration: 'none', color: 'inherit' }}>
                <p>View Former Employees.</p>
              </Link>
            </Footer>
          </div>

          <MainFooter>
            <p>Media and Graphics Prince Mashumu 2024</p>
          </MainFooter>
        </div>
      </Wrapper>
    </>
  );
}

export default Home;