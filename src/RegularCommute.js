import React from 'react';

/*
    This website https://thesource.metro.net/2016/06/22/metro-bike-share-what-will-it-cost-and-how-to-use-tap-to-get-a-bike/
    recommends that people that use a bike share program a couple of times per week purchase the monthly pass, those that
    use the bike share program occasianally to buy a flex pass, and visitors and tourists to get a walk-up pass.
    I am assuming the people that use a bike share program a couple of times per week are the same people that are including 
    bikes into their regular commute. So I will be using the number of people with a monthly pass to calculate how many people 
    include bike sharing into their commute.
*/

class RegularCommute extends React.Component{
    constructor(props){
        super(props);
        this.grabNum = this.grabNum.bind(this);
    }
    // This function finds the number of people with a monthly pass
    grabNum(arr){
       const num = this.props.data.filter(d => d==="Monthly Pass").length;
       return num;
    }
    render () {
        return (
            <div>
                Number of Regular Commuters: {this.grabNum(this.props.data)}
            </div>
        )}
}
export default RegularCommute;