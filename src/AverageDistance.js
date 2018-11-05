import React from 'react';

/*
    This component is a child component for the Stats component. I found the average starting and ending latitudes
    and longitudes and used it to calculate the average distance with an online calculator.
*/

class AverageDistance extends React.Component {
    render() {
        return (
            <div>
                <p>Average Trip Distance: 1.37 km or 0.8512785 miles </p>
            </div>
        )
    }
}
export default AverageDistance;