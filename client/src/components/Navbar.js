import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

function MyNavbar() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  }

  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/home"><b>SUPER ROOMS</b></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav style={{paddingRight:85}}>
          {user ? (
            <NavDropdown 
              title={<><i className="fa fa-user"></i> {user.name}</>} 
             // Adjust the placement of the dropdown menu
            >
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Nav.Item>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
