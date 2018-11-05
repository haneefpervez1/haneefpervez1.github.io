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
    This component renders a barchart that shows the average duration of a bike ride by pass type.
*/

export default class BarChart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: true
        }
        this.findAverage = this.findAverage.bind(this);
        this.setValue = this.setValue.bind(this);
    }
    // Sets value for the hint component for the chart
    setValue (val) {
        this.setState({value: val});
    }
    // Finds average duration
    findAverage(durationArr, passArr, str){
        let sum = 0;
        let counter = 0;
        for (let i = 0; i < durationArr.length; i++){
            if(passArr[i] === str){
                sum += parseInt(durationArr[i], 10);
                counter++;
            }
        }
        let result = sum/counter;
        return result/60;
    }
    render() {
        return (
        <div className="Graph">
            <h4 className="GraphTitle">Duration of Ride by Pass Type</h4>
            <div className="GraphParagraphContainer">
                <XYPlot 
                xType="ordinal" 
                width={300} 
                height={300} 
                xDistance={50} 
                margin={{left: 100}}
                onMouseLeave = {() => this.setState({value: false})}
                >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries className="vertical-bar-series-example" 
                onNearestXY = {value => this.setValue(value)}
                data={
                    [
                        {x: 'Walk-up', y: this.findAverage(this.props.data, this.props.passType, 'Walk-up')},
                        {x: 'Flex Pass', y: this.findAverage(this.props.data, this.props.passType, 'Flex Pass')},
                        {x: 'Monthly Pass', y: this.findAverage(this.props.data, this.props.passType, "Monthly Pass")}
                    ]
                } 
                />
                {this.state.value ? <Hint value={this.state.value} /> : null}
                </XYPlot>
                <h4 className="Paragraph">A person with a Walk-up pass spends the longest average time on a bike. This may be because mostly tourists
                buy Walk-up passes and will be spending more time riding around the area. Monthly riders average 14.3 minutes
                a trip, this is probably because a trip under 30 minutes with a monthly pass is free. Flex Pass holders also
                average less than 30 minutes a trip, probably because they get charged extra per 30 minutes. </h4>
            </div>
        </div>
        );
    }
}