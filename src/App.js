import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import Display from './components/Display';

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
              <Link to="/total" className="text-white">Total US records</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <Display scope="state"></Display>
        </Route>
        <Route path="/total" exact>
          <Display scope="total"></Display>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
