import React, { Component } from 'react';
import {Text} from 'react-native'
import {Container} from 'native-base';
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin'


export default class Timer extends Component {
    constructor(props){
        super(props)
        this.state = {seconds: 0, minutes:0, intervalId:null}
    }
    componentDidMount(){
       this.setTimer()
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }
    setTimer(){
        var intervalId = setInterval(() => (
           this.setState({seconds: this.state.seconds +1}, () =>{
               if(this.state.seconds%60 == 0){
                   this.setState({minutes: this.state.minutes +1})
               }
           })
           ),1000)
        this.setState({intervalId: intervalId});
    }
    render(){
        return (
                <Text style={{fontWeight:'bold', color:'grey'}}> {(("0" + this.state.minutes%60).slice(-2))} : {(("0" + this.state.seconds%60).slice(-2))}</Text>
        )
    }
}

reactMixin(Timer.prototype, TimerMixin);


