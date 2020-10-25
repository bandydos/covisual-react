import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Visualize extends React.Component {
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
      <div className="container text-center">
        <table className="table table-striped border border-dark">
          <thead>
            <tr>
              <th>Date</th>
              <th>Deaths (day)</th>
              <th>Deaths (total)</th>
            </tr>
          </thead>
          {elems}
        </table>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>
          {this.state.loading || this.state.records.length < 1 ? (
            <div>Loading...</div>
          ) : (
              this.renderRecords()
            )
          }
        </div>
      </div>
    )
  }
}

export default Visualize;