import React from 'react';
import ReactDOM from 'react-dom';

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
          'deaths': jsonresponse[i].death
        });
      }
    } else {
      alert(`Something went wrong, status ${response.status}.`)
      return;
    }

    return records;
  }

  async componentDidMount() {
    const data = await this.getData();
    console.log(data);
    this.setState({ records: data },
      () => console.log('hello')
    )

  }


  render() {

    return <div>Hello {this.state.records}</div>
  }

}

export default Visualize;
