import React from 'react'
import { Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
//* CSS
import './CSS/NavBar_component.scss'





function NavBar_component() {
  return (
    <Navbar bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" className='text-white'>Chat App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="/" className='text-white'>Home</Nav.Link>
            <Nav.Link href="/" className='text-white'>About</Nav.Link>
            <NavDropdown title="Menu" id="navbarScrollingDropdown" className='text-white'>
              <NavDropdown.Item href="/" className='text-dark'>Action</NavDropdown.Item>
              <NavDropdown.Item href="/" className='text-dark'>Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/" className='text-white' disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <button variant="outline-success" className='btn btn-primary'>Search</button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar_component