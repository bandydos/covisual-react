import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import AllStatesRecords from './AllStatesRecords';
import StateRecords from './StateRecords';

class Navigate extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand>
                            <Link to="/">Covisual</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link>
                                    <Link to="/">Home</Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to="/staterecords">State records</Link>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Switch>
                        <Route path="/" exact component={AllStatesRecords}></Route>
                        <Route path="/staterecords" exact component={StateRecords}></Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}


export default Navigate;