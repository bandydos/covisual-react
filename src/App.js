import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import AllStatesRecords from './components/AllStatesRecords';

function App() {
  return (
    <Router>
      <Navbar bg="primary" expand="lg">
        <Navbar.Brand>
          <Link to="/" className="text-white">Covisual US</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/" className="text-white">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/allstatesrecords" className="text-white">Total US records</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <AllStatesRecords scope="state"></AllStatesRecords>
        </Route>
        <Route path="/allstatesrecords" exact>
          <AllStatesRecords scope="total"></AllStatesRecords>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
