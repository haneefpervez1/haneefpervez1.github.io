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
    MarkSeries,
    Hint
  } from 'react-vis';

/*
  I found the start dates of each season during 2016-2017 on https://www.timeanddate.com/calendar/seasons.html.
  The data set starts with a date in summer and ends with a date in spring. Although there are about 6000 cells that
  represent data from spring, that only corresponds to 11 days in total. I figured that the biggest differentiator between 
  seasons was the weather and the weather at the beginning of spring is usually similar to winter, so I decided to
  consider the spring data as part of the winter data.
  This component renders some graphs that show the difference between the seasons.
*/
export default class Seasons extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            season: "Summer",
            value: true
        }
        this.setValue = this.setValue.bind(this);
        this.handleSetSummer = this.handleSetSummer.bind(this);
        this.handleSetFall = this.handleSetFall.bind(this);
        this.handleSetWinter = this.handleSetWinter.bind(this);
        this.passData = this.passData.bind(this);
    }
    // This function sets the value for the hint for the graph.
    setValue (val) {
        this.setState({value: val});
    }
    // This function finds the total occurrences of a pass type within a specified range.
    passData(arr, startIndex, endIndex, str){
        let i = 0;
        let counter = 0;
        for(i = startIndex; i < endIndex + 1; i++){
            if(arr[i] === str){
                counter++;
            }
        }
        return counter;
    }
    // This sets the state to summer.
    handleSetSummer(){
        this.setState(() => ({season: "Summer"}));
    }
    // This sets the state to fall.
    handleSetFall(){
        this.setState(() => ({season: "Fall"}));
    }
    // This setes the state to winter.
    handleSetWinter(){
        this.setState(() => ({season: "Winter"}));
    }
    render() {
       // console.log(this.props.startTime[1].substring(5,7) + '/' + this.props.startTime[1].substring(8,10));
        const season = this.state.season;
        let durationData = this.props.startTime.map((d) => {
            return {x: d.substring(5,7) + '/' + d.substring(8,10),
                    y: 1  
            }
        });
        let comp;
        if(season === "Summer"){
            comp =  <div >
            <XYPlot 
            xType="ordinal" 
            width={500} height={500} 
            xDistance={100} 
            margin = {{left: 75 }}
            yDomain = {[0, 30000]}
            onMouseLeave = {() => this.setState({value: false})}
            >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries
            onNearestXY = {value => this.setValue(value)}
            data = {[
                {x: "Monthly", y: this.passData(this.props.passType, 0, 50075, "Monthly Pass")},
                {x: "Walk-up", y: this.passData(this.props.passType, 0, 50075, "Walk-up")},
                    {x: "Flex", y: this.passData(this.props.passType, 0, 50075, "Flex Pass")}
                      
            ]}
            />
            {this.state.value ? <Hint value={this.state.value} /> : null}
            </XYPlot>
            
              
                </div>
        } else if(season === "Fall"){
            comp =  <div>
            <XYPlot 
            xType="ordinal" 
            width={500} 
            height={500} 
            xDistance={100} 
            margin = {{left: 75 }} 
            yDomain = {[0, 30000]}
            onMouseLeave = {() => this.setState({value: false})}
            >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis on0={true}/>
            <VerticalBarSeries
            onNearestXY = {value => this.setValue(value)}
            data = {[
                {x: "Monthly", y: this.passData(this.props.passType, 50075, 95738, "Monthly Pass")},
                {x: "Walk-up", y: this.passData(this.props.passType, 50075, 95738, "Walk-up")},
                    {x: "Flex", y: this.passData(this.props.passType, 50075, 95738, "Flex Pass")}
                    
                
            ]}
            />
            {this.state.value ? <Hint value={this.state.value} /> : null}
                </XYPlot>
                
             
                </div>
        } else if(season === "Winter"){
            comp = <div >
            <XYPlot 
            xType="ordinal" 
            width={500} 
            height={500} 
            xDistance={100} 
            margin = {{left: 75 }} 
            yDomain = {[0, 30000]}
            onMouseLeave = {() => this.setState({value: false})}
            >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis on0={true}/>
            <VerticalBarSeries
            onNearestXY = {value => this.setValue(value)}
            data = {[
                {x: "Monthly", y: this.passData(this.props.passType, 95739, 132427, "Monthly Pass")},
                {x: "Walk-up", y: this.passData(this.props.passType, 95739, 132427, "Walk-up")},
                    {x: "Flex", y: this.passData(this.props.passType, 95739, 132427, "Flex Pass")}
                    
                
            ]}
            />
            {this.state.value ? <Hint value={this.state.value} /> : null}
                </XYPlot>
                
                </div>
        }
        return (
            <div className="Graph">
                
                <h4 className="GraphTitle">Pass Type by Season</h4>
                <button className="SeasonButton" onClick={this.handleSetSummer}>Summer</button>
                <button className="SeasonButton" onClick={this.handleSetFall}>Fall</button>
                <button className="SeasonButton" onClick={this.handleSetWinter}>Winter</button>
                <div className="GraphParagraphContainer">
                    {comp}
                    <h4 className="Paragraph">The bike share program is most active during the summer. The winter has the least amount of passes
                    for the seasons represented by the data. This is probably because of the difference in weather between the seasons.</h4>
                </div>
            </div>
        )
    }
}

/*
 <XYPlot xType="ordinal" width={500} height={500} xDistance={100}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis on0={true}/>
            <MarkSeries
                curve="curveNatural"
                data = {[
                    {x: 0, y:3},
                    {x: 1, y:1}
                ]}
            />
                </XYPlot>
*/