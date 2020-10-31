import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import RenderRecords from './components/RenderRecords';

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
          <RenderRecords scope="state"></RenderRecords>
        </Route>
        <Route path="/allstatesrecords" exact>
          <RenderRecords scope="total"></RenderRecords>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
