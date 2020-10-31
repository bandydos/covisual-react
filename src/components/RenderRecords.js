import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import stateOptions from '../data/stateOptions';
import Select from 'react-select';

class RenderRecords extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      records: [],
      val: 'ny',
      lbl: 'New York'
    }
  }

  // Function to clean date format (yyyymmdd to dd-mm-yyyy).
  cleanupDate(d) {
    return d.slice(6) + '/' + d.slice(4, 6) + '/' + d.slice(0, 4);
  }

  // Fetch records.
  fetchRecords = async () => {
    let response;

    // Check props for location scope (total US or single state).
    if (this.props.scope === 'total') {
      response = await fetch("https://api.covidtracking.com/v1/us/daily.json");
    } else if (this.props.scope === 'state') {
      response = await fetch(`https://api.covidtracking.com/v1/states/${this.state.val}/daily.json`);
    } else {
      alert('Something went wrong.');
    }

    const jsonresponse = await response.json(); // Await as json.

    const recs = []; // Records array.

    // If response.ok (status 200 / 202) === true.
    if (response.ok) {
      for (let i = 0; i < jsonresponse.length; i++) {
        // Push object into records array.
        recs.push({
          'date': this.cleanupDate(String(jsonresponse[i].date)),
          'deathstoday': jsonresponse[i].deathIncrease,
          'deathstotal': jsonresponse[i].death
        });
      }
      // Set state (loading => loaded and fill up records).
      this.setState({
        loading: false,
        records: recs
      })
    } else {
      alert(`Something went wrong, status ${response.status}.`);
      return;
    }
  }

  // If props change when rendering component.
  componentDidUpdate = async (prevProps) => {
    // Compare previous props to this.props.
    if (prevProps.scope !== this.props.scope) {
      await this.fetchRecords(); // Fetch records if changed.
    }
  }

  // If component rendered.
  componentDidMount = async () => {
    // Await fetch and rerender.
    await this.fetchRecords();
  }

  renderChart() {
    const { records } = this.state; // Destruct records from state.

    // X and Y labels for chart.
    const xdates = [];
    const ydeathstoday = [];
    const ydeathstotal = [];

    // Loop inverted.
    for (let i = records.length - 1; i >= 0; i--) {
      if (records[i].deathstotal > 0) { // Start pushing from first death.
        xdates.push(records[i].date);
        ydeathstoday.push(records[i].deathstoday);
        ydeathstotal.push(records[i].deathstotal);
      }
    }

    // Table data for total deaths.
    const dataTotalDeaths = {
      labels: xdates,
      datasets: [
        {
          label: 'Total deaths',
          data: ydeathstotal,
          borderColor: ['#CD5C5C'],
          backgroundColor: ['#CD5C5C']
        }
      ]
    }

    // Table data for deaths today (deaths per day).
    const dataDeathsToday = {
      labels: xdates,
      datasets: [
        {
          label: 'Deaths per day',
          data: ydeathstoday,
          borderColor: ['#CD5C5C'],
          backgroundColor: ['#CD5C5C']
        }
      ]
    }

    return (
      <div>
        <div className="row mt-5 justify-content-center">
          <div className="col-6 text-center">
            {this.props.scope === 'total' ? (
              <h3>Covid-19 death records for all states</h3>
            ) : (
                <h3>Covid-19 death records for {this.state.lbl}</h3>
              )
            }
          </div>
        </div>
        <div className="row mt-5 justify-content-center">
          <div className="col-10">
            <Line data={dataTotalDeaths}></Line>
          </div>
        </div>
        <div className="row mt-5 justify-content-center">
          <div className="col-10">
            <Line data={dataDeathsToday}></Line>
          </div>
        </div>
        <br></br><br></br>
      </div>
    )
  }

  renderTable() {
    const trs = []; // Table rows with <td>'s.
    const NUM_RECORDS = 50; // Number of records to display.

    for (let i = 0; i < NUM_RECORDS; i++) {
      trs.push(
        <tr key={i}>
          <td>{this.state.records[i].date}</td>
          <td>{this.state.records[i].deathstoday}</td>
          <td>{this.state.records[i].deathstotal}</td>
        </tr>
      )
    }

    return (
      <div>
        <div className="row mt-5 justify-content-center">
          <div className="col-6 text-center">
            {this.props.scope === 'total' ? (
              <h3>Last {NUM_RECORDS} day details table (all states)</h3>
            ) : (
                <h3>Last {NUM_RECORDS} day details table ({this.state.lbl})</h3>
              )}
          </div>
        </div>
        <div className="row mt-5 justify-content-center">
          <div className="col-10 text-center">
            <Table bordered hover>
              <thead className="bg-primary text-white">
                <tr>
                  <th>Date</th>
                  <th>Deaths (day)</th>
                  <th>Deaths (total)</th>
                </tr>
              </thead>
              <tbody>
                {trs}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  }

  // Handle select onChange (don't setState directly in render method).
  handleChange = async (event) => {
    this.setState({
      loading: true,
      val: event.value,
      lbl: event.label
    }, await this.fetchRecords) // Callback to fetchRecords.
  }

  renderDropdown = () => {
    return (
      <div>
        <div className="row mt-5 justify-content-center">
          <div className="col-10">
            <Select
              placeholder="Select state"
              options={stateOptions} // Give options.
              onChange={this.handleChange}
            ></Select>
          </div>
        </div>
      </div >
    )
  }

  // Main render function.
  render() {
    if (this.state.loading) {
      return (
        <div className="container">
          <div className="row mt-5 justify-content-around">
            <div className="col-10">
              <h5>Loading...</h5>
            </div>
          </div>
        </div>
      )
    }

    if (this.state.records.length < 1) {
      return (
        <div className="container">
          <div className="row mt-5 justify-content-around">
            <div className="col-10">
              <h5>No data found...</h5>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="container">
          {this.props.scope === 'total' ? (
            <div></div>
          ) : (
              this.renderDropdown()
            )}
          {this.renderChart()}
          {this.renderTable()}
        </div>
      </div>
    )
  }
}

export default RenderRecords;