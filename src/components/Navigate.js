import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import AllStatesRecords from './AllStatesRecords';
import StateRecords from './StateRecords';

class Navigate extends React.Component {
    // A good looking navbar that can navigate through routing.
    render() {
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
                    <Route path="/" exact component={StateRecords}></Route>
                    <Route path="/allstatesrecords" exact component={AllStatesRecords}></Route>
                </Switch>
            </Router>
        )
    }
}

export default Navigate;