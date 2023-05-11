import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import './navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar1 = () => {
 // const navigate = useNavigate()
  function onLogout() {
    localStorage.removeItem("token");
  }
  const selector = useSelector((state)=>state.sravanthi.count)
  const selectorjobs = useSelector((state)=>state.sravanthijobs.value)
  console.log(selectorjobs)

  return (
    <>
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link href="/home">Home {selector}</Nav.Link>
            <Nav.Link as={NavLink} to="about">Add job</Nav.Link>
            <Nav.Link as={NavLink} to="addedjobs">Jobs{selectorjobs}</Nav.Link>
            {/* <Nav.Link as={NavLink} to="/login" onClick={()=>{onLogout()}}>Logout</Nav.Link> */}
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login" onClick={()=>{onLogout()}}>
              Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Navbar1;