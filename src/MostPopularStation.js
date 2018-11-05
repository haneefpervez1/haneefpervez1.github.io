import React from 'react';
import Map from './Map'

/*
    This component finds the most popular starting and ending stations. 
*/

class MostPopular extends React.Component{
    constructor(props){
        super(props);
        this.findMax = this.findMax.bind(this);
    }
    // This function finds which station shows up the most in the csv file
    findMax(arr){
        arr.sort();
        var max = 0; 
        var result; 
        var freq = 0;
        for(var i = 0; i < arr.length; i++){
            if(arr[i]===arr[i+1]){
                freq++;
            }
            else {
                freq=0;
            }
            if(freq>max){
                result = arr[i];
                max = freq;
            }
        }
        return result;
    }
    
    render () {
        return (
            <div>
                <div >
                    <p>Most Popular Starting Station: {this.findMax(this.props.startStation)}</p>
                </div>
                <div>
                    <p >Most Popular Ending Station: {this.findMax(this.props.endStation)}</p>
                </div>
            </div>
        )
    }
}
export default MostPopular;