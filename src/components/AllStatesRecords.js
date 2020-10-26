import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

class AllStatesRecords extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      records: []
    }
  }

  cleanupDate(d) {
    return d.slice(6) + '/' + d.slice(4, 6) + '/' + d.slice(0, 4);
  }

  // Same as in StateRecords.js but different url (all states).
  async getData() {
    const url = 'https://api.covidtracking.com/v1/us/daily.json';

    const response = await fetch(url);
    const jsonresponse = await response.json();

    const records = [];

    if (response.ok) {
      for (let i = 0; i < jsonresponse.length; i++) {
        records.push({
          'date': this.cleanupDate(String(jsonresponse[i].date)), 
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
    const data = await this.getData();
    this.setState({
      loading: false,
      records: data
    })
  }


  renderChart() {
    const recs = this.state.records;
    const xdates = [];
    const ydeathstoday = [];
    const ydeathstotal = [];

    for (let i = recs.length - 1; i >= 0; i--) {
      if (recs[i].deathstotal > 0) {
        xdates.push(recs[i].date);
        ydeathstoday.push(recs[i].deathstoday);
        ydeathstotal.push(recs[i].deathstotal);
      }
    }

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

    const dataDeathsPerDay = {
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
            <h3>Covid-19 death records for all states</h3>
          </div>
        </div>
        <div className="row mt-5 justify-content-center">
          <div className="col-10">
            <Line data={dataTotalDeaths}></Line>
          </div>
        </div>
        <div className="row mt-5 justify-content-center">
          <div className="col-10">
            <Line data={dataDeathsPerDay}></Line>
          </div>
        </div>
        <br></br><br></br>
      </div>
    )
  }


  renderRecords() {
    const elems = [];

    const NUM_RECORDS = 50;

    for (let i = 0; i < NUM_RECORDS; i++) {
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
      <div>
        <div className="row mt-5 justify-content-center">
          <div className="col-6 text-center">
            <h3>Last {NUM_RECORDS} day details table (all states)</h3>
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
              {elems}
            </Table>
          </div>
        </div>
      </div>
    )
  }


  render() {
    return (
      <div>
        <div className="container">
          {this.renderChart()}
          <div>
            {this.state.loading || this.state.records.length < 1 ? (
              <div className="container mt-5">Loading...</div>
            ) : (
                this.renderRecords()
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default AllStatesRecords;