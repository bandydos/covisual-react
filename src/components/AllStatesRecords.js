import React from 'react';
import ReactDOM from 'react-dom';
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

  async getData() {
    const url = 'https://api.covidtracking.com/v1/us/daily.json';

    const response = await fetch(url);
    const jsonresponse = await response.json();

    const records = [];

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
    const data = await this.getData();
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
        <Table bordered>
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
    const recs = this.state.records;
    const xdates = [];
    const ydeathstoday = [];
    const ydeathstotal = [];

    for (let i = recs.length - 1; i >= 0; i--) {
      if (recs[i].deathstotal > 0) { // When deaths start.
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
      <div className="container">
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
      </div>
    )
  }




  render() {
    return (
      <div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-6 text-center">
          <h3>Records for all states</h3>
            </div>
          </div>
        </div>
        <div>
          {this.state.loading || this.state.records.length < 1 ? (
            <div className="container mt-5">Loading...</div>
          ) : (
              this.showChart()
              
              //this.renderRecords()
            )
          }
        </div>
      </div>
    )
  }
}

export default AllStatesRecords;