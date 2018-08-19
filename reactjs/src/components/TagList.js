import React, { Component } from 'react';

export default class TagList extends Component {
    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Firing</th>
                            <th scope="col">Edited</th>
                        </tr>
                    </thead>
                    <tbody id="tbl-tags"></tbody>
                </table>
            </div>
        );
    }
}