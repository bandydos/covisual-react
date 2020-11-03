import React, { Component } from 'react';
import Select from 'react-select';
import stateOptions from '../data/stateOptions';
import RecordsChart from './RecordsChart';
import RecordsTable from './RecordsTable';

export class FetchAndDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            records: [],
            val: 'ny', // Initial fetch for ny.
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

    // Handle select onChange (don't setState directly in render method).
    handleChange = (event) => {
        this.setState({
            loading: true, // Loading new data.
            val: event.value,
            lbl: event.label
        }, this.fetchRecords) // Callback to fetchRecords.
    }

    render() {
        // If loading return loadscreen.
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

        const NUM_RECORDS = 50; // Number of records (to display in table).

        // JSX to return on render.
        return (
            <div className="container">
                <div>
                    {this.props.scope === 'state' ? (
                        <div className="row mt-5 justify-content-center">
                            <div className="col-10">
                                <Select
                                    placeholder="Select state"
                                    options={stateOptions} // Give options.
                                    onChange={this.handleChange}
                                ></Select>
                            </div>
                        </div>
                    ) : (
                            <div></div>
                        )}
                </div >
                <div>
                    <div className="row mt-5 justify-content-center">
                        <div className="col-6 text-center">
                            {this.props.scope === 'state' ? (
                                <h3>Covid-19 death records for {this.state.lbl}</h3>
                            ) : (
                                    <h3>Covid-19 death records for all states</h3>
                                )
                            }
                        </div>
                    </div>
                    <RecordsChart rcrds={this.state.records} lbl={this.state.lbl}></RecordsChart>
                    <div className="row mt-5 justify-content-center">
                        <div className="col-6 text-center">
                            {this.props.scope === 'state' ? (
                                <h3>Last {NUM_RECORDS} day details table ({this.state.lbl})</h3>
                            ) : (
                                    <h3>Last {NUM_RECORDS} day details table (all states)</h3>
                                )}
                        </div>
                    </div>
                    <RecordsTable rcrds={this.state.records} lbl={this.state.lbl} num_rcrds={NUM_RECORDS}></RecordsTable>
                </div>
            </div>
        )
    }
}

export default FetchAndDisplay
