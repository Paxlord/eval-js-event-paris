import React from 'react';
import {
  Navbar, Form, FormControl,
} from 'react-bootstrap';
import Datetime from 'react-datetime';

const Navigation = ({ handleSearch, handleDate }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">Eval Event Paris</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Form inline>
        <FormControl type="text" placeholder="Recherchez un évenement" className="mr-sm-8" onChange={(e) => handleSearch(e.target.value)} />
      </Form>
      <Datetime timeFormat={false} onChange={(date) => { console.log(date.format('YYYY-MM-DD')); handleDate(date.format('YYYY-MM-DD')); }} />
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
