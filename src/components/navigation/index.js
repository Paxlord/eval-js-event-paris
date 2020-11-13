import React from 'react';
import {
  Navbar, Form, Button, FormControl,
} from 'react-bootstrap';

const Navigation = ({ handleSearch }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => handleSearch(e.target.value)} />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
