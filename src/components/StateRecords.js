import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { Button, Navbar, NavDropdown, Nav, Form, FormControl, Table } from 'react-bootstrap';

class AllStates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      records: []
    }
  }

  async getUSData() {
    const url = 'https://api.covidtracking.com/v1/us/daily.json';

    // URL for specific state (expansion).
    const state = 'ny';
    const stateurl = 'https://api.covidtracking.com/v1/states/ ' + state + '/daily.json';

    const response = await fetch(url);
    const jsonresponse = await response.json();

    let records = [];

    if (response.ok) {
      for (let i = 0; i < jsonresponse.length; i++) {
        records.push({
          'date': jsonresponse[i].date,
          'deathstoday': jsonresponse[i].deathIncrease,
          'deathstotal': jsonresponse[i].death
        });
      }
    } else {
      alert(`Something went wrong, status ${response.status}.`);
      return;
    }

    return records;
  }

  async componentDidMount() {
    const data = await this.getUSData();
    this.setState({
      loading: false,
      records: data
    })
  }

  renderRecords() {
    const elems = [];

    for (let i = 0; i < this.state.records.length; i++) {
      elems.push(
        <tbody key={i}>
          <tr>
            <td>{this.state.records[i].date}</td>
            <td>{this.state.records[i].deathstoday}</td>
            <td>{this.state.records[i].deathstotal}</td>
          </tr>
        </tbody>
      )
    }

    return (
      <div className="container text-center mt-5">
        <Table striped bordered>
          <thead>
            <tr>
              <th>Date</th>
              <th>Deaths (day)</th>
              <th>Deaths (total)</th>
            </tr>
          </thead>
          {elems}
        </Table>
      </div>
    )
  }

  showChart() {

  }

  render() {
    return (
      <div>
        <div className="container mt-5">
          <h3>State records</h3>
        </div>
        <div>
          {this.state.loading || this.state.records.length < 1 ? (
            <div className="container mt-5">Loading...</div>
          ) : (
              this.renderRecords()
            )
          }
        </div>
      </div>
    )
  }
}

export default AllStates;