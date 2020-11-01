import React, { Component } from 'react'
import { Table } from 'react-bootstrap';

export class RecordsTable extends Component {
    render() {
        const { rcrds, num_rcrds } = this.props; // Destructure rcrds from props.
        const trs = []; // Table rows with <td>'s.

        // Push num_rcrds (50) rows.
        for (let i = 0; i < num_rcrds; i++) {
            trs.push(
                <tr key={i}>
                    <td>{rcrds[i].date}</td>
                    <td>{rcrds[i].deathstoday}</td>
                    <td>{rcrds[i].deathstotal}</td>
                </tr>
            )
        }

        // JSX to return on render.
        return (
            <div>
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
}

export default RecordsTable
