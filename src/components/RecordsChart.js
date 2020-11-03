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
                ydeathstoday.push(rcrds[i].deathstoday); // Push todays deaths.
            }
        }

        const num_points = 100; // Number of points.
        let range = parseInt(ydeathstoday.length / num_points); // Range of numbers.
        let nextRange = range;

        for (let i = rcrds.length - 1; i >= 0; i--) {
            if (rcrds[i].deathstotal > 0) {
                ydeathstotal.push(rcrds[i].deathstotal); // Push total deaths and dates.
                xdates.push(rcrds[i].date);
                i = i - range; // Step one range further.
            }
        }

        const deathsTodayRanges = [];
        let start = 0;

        for (let j = 0; j < num_points; j++) {
            deathsTodayRanges.push(ydeathstoday.slice(start, range));
            start = start + nextRange;
            range = range + nextRange;

        }

        const averages = [];
        let sum = 0;
        for (let i = 0; i < deathsTodayRanges.length; i++) {
            sum = deathsTodayRanges[i].reduce((a, b) => a + b)
            averages.push(parseInt(sum / deathsTodayRanges[i].length))
        }

        console.log(deathsTodayRanges)
        console.log(averages)



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
                    data: averages,
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
