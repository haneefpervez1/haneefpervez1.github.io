import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesCanvas,
    LabelSeries,
    Hint
  } from 'react-vis';

/*
  This component renders a bar graph that shows the breakdown of the different types of pass types.
*/

export default class PassCombo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: false
        }
        this.findTotal = this.findTotal.bind(this);
        this.setValue = this.setValue.bind(this);
    }
    // This function sets the value for the hint for the graph
    setValue (val) {
        this.setState({value: val});
    }
    // This function finds the total number of instances for a pass type combination
    findTotal(arr1, arr2, cat1, cat2){
        let sum = 0;
        for(let i = 0; i < arr1.length; i++){
            if(arr1[i] === cat1 && arr2[i] === cat2){
                sum++;
            }
        }
        return sum;
    }
    render() {
        return (
            <div className="Graph">
                <h4 className="GraphTitle">Breakdown of Pass Combinations</h4>
                <div className="GraphParagraphContainer">
                <XYPlot xType="ordinal" width={800} height={500} xDistance={100} margin={{left: 100}} onMouseLeave = {() => this.setState({value: false})}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries className="vertical-bar-series-example" 
                onNearestXY = {value => this.setValue(value)}
                data={
                    [
                        {x: "One Way Monthly Pass", y: this.findTotal(this.props.tripCat, this.props.passType, "One Way", "Monthly Pass")},
                        {x: "One Way Walk-up", y: this.findTotal(this.props.tripCat, this.props.passType, "One Way", "Walk-up")},
                        {x: "One Way Flex Pass", y: this.findTotal(this.props.tripCat, this.props.passType, "One Way", "Flex Pass")},
                        {x: "RoundTrip Walk-up", y:this.findTotal(this.props.tripCat, this.props.passType, "Round Trip", "Walk-up")},
                        {x: "RoundTrip Monthly Pass", y: this.findTotal(this.props.tripCat, this.props.passType, "Round Trip", "Monthly Pass")},
                        {x: "RoundTrip Flex Pass", y: this.findTotal(this.props.tripCat, this.props.passType, "Round Trip", "Flex Pass")}
                    ]
                } />
                {this.state.value ? <Hint value={this.state.value} /> : null}
                </XYPlot>
                <h4 className="Paragraph">One way passes seem to be more popular than round trip passes. In the case of commuters this may be 
                    because a bike may be faster than other types of transportation for a morning or evening commute, but
                    not necessarily for both. Another reason might be because individuals my not plan to use the bike share 
                    program and only use it when they find a station close by. This might apply especially to tourists.</h4>
                </div>
            </div>
        )
    }
}