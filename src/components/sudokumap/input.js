
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
  TouchableWithoutFeedback
} from 'react-native';

var {height, width} = Dimensions.get('window');
export default class Input extends Component {
  constructor(props){
      super(props)
      this.state = {}
      this.onTab = this.onTab.bind(this)
  }
  componentWillMount(){
    if(this.props.value != null){
      this.setState({touchable:false})
    }
  }
  onTab(){
      this.props.callback(this.props.value)
  }

  render(){
    return (
     <TouchableWithoutFeedback onPress={this.onTab} underlayColor="#ddddff" ><View style={{width: width/9, height: width/9, borderColor:'black', borderWidth:1, justifyContent: 'center'}}><Text style={{textAlign:'center', fontSize:width/15}}>{this.props.value}</Text></View></TouchableWithoutFeedback>
    )
  }
}


