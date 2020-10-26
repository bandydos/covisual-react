import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import Select from 'react-select';

class StateRecords extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      stt: '',
      records: []
    }
  }

  async getData(stt) {
    const url = `https://api.covidtracking.com/v1/states/${stt}/daily.json`;

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
    const data = await this.getData('ny');
    this.setState({
      loading: false,
      stt: 'New York',
      records: data
    })
  }

  renderDropDown() {
    const options = [
      { label: "Alabama", value: "AL" },
      { label: "Alaska", value: "AK" },
      { label: "Arizona", value: "AZ" },
      { label: "Arkansas", value: "AR" },
      { label: "California", value: "CA" },
      { label: "Colorado", value: "CO" },
      { label: "Connecticut", value: "CT" },
      { label: "Delaware", value: "DE" },
      { label: "District of Columbia", value: "DC" },
      { label: "Florida", value: "FL" },
      { label: "Georgia", value: "GA" },
      { label: "Hawaii", value: "HI" },
      { label: "Idaho", value: "ID" },
      { label: "Illinois", value: "IL" },
      { label: "Indiana", value: "IN" },
      { label: "Iowa", value: "IA" },
      { label: "Kansas", value: "KS" },
      { label: "Kentucky", value: "KY" },
      { label: "Louisiana", value: "LA" },
      { label: "Maine", value: "ME" },
      { label: "Maryland", value: "MD" },
      { label: "Massachusetts", value: "MA" },
      { label: "Michigan", value: "MI" },
      { label: "Minnesota", value: "MN" },
      { label: "Mississippi", value: "MS" },
      { label: "Missouri", value: "MO" },
      { label: "Montana", value: "MT" },
      { label: "Nebraska", value: "NE" },
      { label: "Nevada", value: "NV" },
      { label: "New Hampshire", value: "NH" },
      { label: "New Jersey", value: "NJ" },
      { label: "New Mexico", value: "NM" },
      { label: "New York", value: "NY" },
      { label: "North Carolina", value: "NC" },
      { label: "North Dakota", value: "ND" },
      { label: "Ohio", value: "OH" },
      { label: "Oklahoma", value: "OK" },
      { label: "Oregon", value: "OR" },
      { label: "Pennsylvania", value: "PA" },
      { label: "Rhode Island", value: "RI" },
      { label: "South Carolina", value: "SC" },
      { label: "South Dakota", value: "SD" },
      { label: "Tennessee", value: "TN" },
      { label: "Texas", value: "TX" },
      { label: "Utah", value: "UT" },
      { label: "Vermont", value: "VT" },
      { label: "Virginia", value: "VA" },
      { label: "Washington", value: "WA" },
      { label: "West Virginia", value: "WV" },
      { label: "Wisconsin", value: "WI" },
      { label: "Wyoming", value: "WY" },
      { label: "American Samoa", value: "AS" },
      { label: "Guam", value: "GU" },
      { label: "Marshall Islands", value: "MH" },
      { label: "Micronesia", value: "FM" },
      { label: "Northern Marianas", value: "MP" },
      { label: "Palau", value: "PW" },
      { label: "PuertoRico", value: "PR" },
      { label: "VirginIslands", value: "VI" },
    ];

    return (
      <div>
        <div className="row mt-5 justify-content-center">
          <div className="col-10">
          <Select
            placeholder="Select state"
            options={options}
            onChange={async (value) => {
              const data = await this.getData(value.value);
              this.setState({
                loading: false,
                stt: value.label,
                records: data
              })
            }}
          >
          </Select>
        </div>
      </div>
          </div>
    )
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
            <h3>Covid-19 death records for {this.state.stt}</h3>
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
            <h3>Last 50 days table for {this.state.stt}</h3>
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
          {this.renderDropDown()}
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

export default StateRecords;