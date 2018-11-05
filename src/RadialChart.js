import React, {Component} from 'react';
import {RadialChart} from 'react-vis';

/*
  This component renders a pie chart that shows the break down by pass type
*/

export default class PieChart extends Component {
  render() {
    const MonthlyPass = this.props.data.filter(d => d==="Monthly Pass").length;
    const FlexPass = this.props.data.filter(d => d==="Flex Pass").length;
    const WalkUp = this.props.data.filter(d => d==="Walk-up").length;
    return (
      <div className="Graph">
        <h4 className="GraphTitle">Breakdown of Pass Types</h4>
        <div className="GraphParagraphContainer">
          <RadialChart
            colorType={'literal'}
            colorDomain={[0, 100]}
            colorRange={[0, 10]}
            getLabel={d => d.name}
            data={[
              {angle: MonthlyPass, color: '#89DAC1', name: 'Monthly Pass'}, 
              {angle: FlexPass, color: '#F6D18A', name: 'Flex Pass'},   
              {angle: WalkUp, color: '#1E96BE', name: 'Walk-up'}  
          ]}
            labelsRadiusMultiplier={1.1}
            labelsStyle={{fontSize: 18, fill: '#000000'}}
            showLabels
            style={{stroke: '#fff', strokeWidth: 2}}
            width={400}
            height={300}
          />
          <h4 className="Paragraph">A monthly pass seems to be the most popular type of pass with {MonthlyPass} passes. The people with a monthly pass
            are the ones using the bike share program as a daily part of their commute.
            A Walk-up pass is the next most popular type of pass with {WalkUp} passes. 
            The last type of pass is the Flex Pass with {FlexPass} passes.</h4>
          </div>
      </div>
    );
  }
}
