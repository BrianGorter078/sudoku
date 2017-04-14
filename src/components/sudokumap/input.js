
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';

var {height, width} = Dimensions.get('window');

var fontSize = width/15

if(height > 1000){
  height = width/10
  width = width/5
}else{
  height = width/5
  width = width/5
}

export default class Input extends Component {
  constructor(props){
      super(props)
      this.state = {value:null}
      this.onTab = this.onTab.bind(this)
  }
  componentWillMount(){
    this.setState({value:this.props.value[this.props.index.i][this.props.index.j]})
  }
  onTab(){
      this.props.callback(this.state.value)
  }

  render(){
    return (
     <TouchableWithoutFeedback onPress={this.onTab} underlayColor="#69e2ff" activeOpacity={10}><View style={{width:width, height: height, borderColor:'black', borderWidth:1, justifyContent: 'center'}}><Text style={{textAlign:'center', fontSize}}>{this.state.value}</Text></View></TouchableWithoutFeedback>
    )
  }
}


