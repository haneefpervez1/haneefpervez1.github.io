import React, { Component } from 'react';
import Papa from 'papaparse';
import RadialChart from './RadialChart';
import BarChart from './BarChart';
import LineGraph from './LineGraph';
import PassCombo from './PassCombo';
import Seasons from './Seasons';
import Dashboard from './Stats';
import Header from './Header';
import Map from './Map';
import './App.css';
import data from './los-angeles-metro-bike-share-trip-data/metro-bike-share-trip-data.csv';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      passType: [],
      startingID: [],
      endID: [],
      startLat: [],
      startLong: [],
      endLat: [], 
      endLong: [],
      duration: [],
      startTime: [],
      tripCat: []
    };
    this.updateData = this.updateData.bind(this);
  }
/*
  Parsing data from the csv file
*/
 componentWillMount(){
    Papa.parse(data, {
      header: true,
      dynamicTyping: true,
      download: true,
      complete: this.updateData
    });
  }
/*
  Callback function for PapaParse; also making each category of csv file accessible from state
*/
  updateData(result){
    const data = result.data;
    this.setState({tripID: data.map(function(item){return item["Trip ID"]})});
    this.setState({duration: data.map(function(item){return item["Duration"]})});
    this.setState({startTime: data.map(function(item){return item["Start Time"]})});
    this.setState({endTime: data.map(function(item){return item["End Time"]})});
    this.setState({startingID: data.map(function(item){return item["Starting Station ID"]})});
    this.setState({startLat: data.map(function(item){return item["Starting Station Latitude"]})});
    this.setState({startLong: data.map(function(item){return item["Starting Station Longitude"]})});
    this.setState({endID: data.map(function(item){return item["Ending Station ID"]})});
    this.setState({endLat: data.map(function(item){return item["Ending Station Latitude"]})});
    this.setState({endLong: data.map(function(item){return item["Ending Station Longitude"]})});
    this.setState({bikeID: data.map(function(item){return item["Bike ID"]})});
    this.setState({planDuration: data.map(function(item){return item["Plan Duration"]})});
    this.setState({tripCat: data.map(function(item){return item["Trip Route Category"]})});
    this.setState({passType: data.map(function(item){return item["Passholder Type"]})});
  }
/*
  Rendering app
*/
  render() {
    return (
    <div>
      <Header />
      <Map />
      {(this.state.passType.length !== 0 && this.state.startingID.length !== 0 && this.state.endID.length !== 0 
        && this.state.startLat.length !== 0 && this.state.startLong.length !== 0 && this.state.endLat.length !== 0 
        && this.state.endLong !== 0) 
        ?
        <Dashboard data={this.state} /> 
        :
        <div class="loader"></div>
      }
      {this.state.passType.length !== 0 && <RadialChart data={this.state.passType} />}
      {(this.state.duration.length !== 0 && this.state.passType.length !== 0 )
        && <BarChart data={this.state.duration} passType={this.state.passType}/>}
      {this.state.startTime.length !== 0 && <LineGraph data={this.state.startTime} />}
      {(this.state.passType.length !== 0 && this.state.tripCat.length !== 0) 
        && <PassCombo tripCat={this.state.tripCat} passType={this.state.passType}/>}
      {(this.state.passType.length !== 0 && this.state.duration.length !== 0 && this.state.startTime.length !== 0) 
        && <Seasons passType={this.state.passType} duration={this.state.duration} startTime = {this.state.startTime}/>}
    </div>
  );
  }
}

export default App;



  
