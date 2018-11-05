import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries,
    Hint
  } from 'react-vis';
/*
  This is a line graph component that shows the total number of riders at a certain hour from 7/7/16 - 3/31/17
*/
export default class Scatterplot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.countData(this.transformData(props.data)),
            value: false
        }
        this.transformData = this.transformData.bind(this);
        this.countData = this.countData.bind(this);
        this.setValue = this.setValue.bind(this);
    }
    /*
        This function extracts the hour from the startingTime field of the csv file.
        I did this so I could find which data corresponded to the time.
    */
    transformData(arr){
        let modArr = [];
        modArr = arr.map(function(item){return parseInt(item.substring(11,13), 10)});
        return modArr;
    }
    // This function counts the number of times an hour(number of trips) shows up in the csv file. 
    countData(arr){
        let counts = {};
        for (let i = 0; i < arr.length; i++){
            let num = arr[i];
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        return counts;
    }
    // This function sets the value for the hint for the graph.
    setValue (val) {
        this.setState({value: val});
    }
    render() {
        return (
            <div className="Graph">
            <h4 className="GraphTitle">Total Number of Rides by Hour</h4>
            <div className="GraphParagraphContainer">
                <XYPlot width={800} 
                height={300} 
                yDomain={[0, 13000]} 
                margin={{left: 75}}
                onMouseLeave = {() => this.setState({value: false})}
                >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <LineSeries
                    curve="curveNatural"
                    opacity={1}
                    color="white"
                    style={{stroke: 'black', strokeWidth: 3}}
                    onNearestXY = {value => this.setValue(value)}
                    data={
                        [
                            {x: 0, y: this.state.count[0]}, 
                            {x: 1, y: this.state.count[1]}, 
                            {x: 2, y: this.state.count[2]},
                            {x: 3, y: this.state.count[3]},
                            {x: 4, y: this.state.count[4]},
                            {x: 5, y: this.state.count[5]},
                            {x: 6, y: this.state.count[6]},
                            {x: 7, y: this.state.count[7]},
                            {x: 8, y: this.state.count[8]},
                            {x: 9, y: this.state.count[9]},
                            {x: 10, y: this.state.count[10]},
                            {x: 11, y: this.state.count[11]},
                            {x: 12, y: this.state.count[12]},
                            {x: 13, y: this.state.count[13]},
                            {x: 14, y: this.state.count[14]},
                            {x: 15, y: this.state.count[15]},
                            {x: 16, y: this.state.count[16]},
                            {x: 17, y: this.state.count[17]},
                            {x: 18, y: this.state.count[18]},
                            {x: 19, y: this.state.count[19]},
                            {x: 20, y: this.state.count[20]},
                            {x: 21, y: this.state.count[21]},
                            {x: 22, y: this.state.count[22]},
                            {x: 23, y: this.state.count[23]},
                            ]
                        }
                    />
                    {this.state.value ? <Hint value={this.state.value} /> : null}
                </XYPlot>
                <h4 className= "Paragraph">This shows the total riders by hour for 7/07/16 - 3/31/17. There are 3 peak times, 8 AM, 12 PM, and 5 PM.
                    Many of the people that use the bike share program use it as part of their commute, so these spikes may
                    be attributed to people arriving to work, leaving for a lunch break, and leaving work for the day. </h4>
                </div>
            </div>
        )
    }
}
