import React from 'react';
import AverageDistance from './AverageDistance';
import MostPopularStation from './MostPopularStation';
import RegularCommute from './RegularCommute';

/*
    This component shows some statistics using the data.
*/

class Dashboard extends React.Component{
    render () {
        return (
            <div className="Dashboard">
                <h2>Some Statistics</h2>
                <AverageDistance 
                    startLat={this.props.data.startLat}
                    startLong={this.props.data.startLong}
                    endLat={this.props.data.endLat}
                    endLong={this.props.data.endLong}
                />
                <MostPopularStation 
                    startStation={this.props.data.startingID}
                    endStation={this.props.data.endID}
                />
                <RegularCommute 
                    data={this.props.data.passType}
                />
            </div>
        )
    }
}
export default Dashboard;