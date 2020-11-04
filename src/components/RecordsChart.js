import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';

export class RecordsChart extends Component {
    render() {
        const { rcrds } = this.props; // Destructure rcrds from props.

        // X and Y labels for chart.
        const xdates = [];
        const ydeathstoday = [];
        const ydeathstotal = [];

        // Loop inverted.
        for (let i = rcrds.length - 1; i >= 0; i--) {
            // Start pushing from first death.
            if (rcrds[i].deathstotal > 0) {
                xdates.push(rcrds[i].date);
                ydeathstoday.push(rcrds[i].deathstoday);
                ydeathstotal.push(rcrds[i].deathstotal);
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

        // JSX to return on render.
        return (
            <div>
                <div className="row mt-4 justify-content-center">
                    <div className="col-10">
                        <Line data={dataTotalDeaths}></Line>
                    </div>
                </div>
                <div className="row mt-4 justify-content-center">
                    <div className="col-10">
                        <Line data={dataDeathsToday}></Line>
                    </div>
                </div>
                <br></br><br></br>
            </div>
        )
    }
}

export default RecordsChart