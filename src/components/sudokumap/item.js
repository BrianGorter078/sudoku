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

var background = [ 
             ['#87CEFA','#87CEFA','#87CEFA','white','white','white','#87CEFA','#87CEFA','#87CEFA'],
             ['#87CEFA','#87CEFA','#87CEFA','white','white','white','#87CEFA','#87CEFA','#87CEFA'],
             ['#87CEFA','#87CEFA','#87CEFA','white','white','white','#87CEFA','#87CEFA','#87CEFA'], 
             ['white','white','white','#87CEFA','#87CEFA','#87CEFA','white','white','white'],
             ['white','white','white','#87CEFA','#87CEFA','#87CEFA','white','white','white'],
             ['white','white','white','#87CEFA','#87CEFA','#87CEFA','white','white','white'],
             ['#87CEFA','#87CEFA','#87CEFA','white','white','white','#87CEFA','#87CEFA','#87CEFA'],
             ['#87CEFA','#87CEFA','#87CEFA','white','white','white','#87CEFA','#87CEFA','#87CEFA'],
             ['#87CEFA','#87CEFA','#87CEFA','white','white','white','#87CEFA','#87CEFA','#87CEFA'] 
          ]

var {height, width} = Dimensions.get('window');
export default class Item extends Component {
  constructor(props){
      super(props)
      this.state = {selected: false, index: this.props.index, value: null, input: this.props.input, touchable:true, values:[], solvedValue: this.props.solvedValue[this.props.index.i][this.props.index.j], done: this.props.done}
      this.onTab = this.onTab.bind(this)
  }
  componentWillMount(){
      if(this.props.value[this.props.index.i][this.props.index.j][0] != null){
          this.setState({touchable:false})
      }
      this.setState({value:(this.props.value)})
  }

  onTab(){
      this.setState({selected:!this.state.selected})
      this.props.callback(this.state.index)
  }
  renderValue(selected){
      var color = 'black'
      var fontsize = width/40
      if(this.state.value[this.props.index.i][this.props.index.j].length == 1){
          fontsize = width/15
      }
      if(this.done == true && this.state.solvedValue[this.props.index.i][this.props.index.j] != this.props.value[this.props.index.i][this.props.index.j][0]){
          color = 'red'
      }
    return this.state.value[this.props.index.i][this.props.index.j].map((item,i) => {
        if(selected){
            return <Text key={item} style={{textAlign:'center', fontSize:fontsize,backgroundColor:'#ffdddd', color}}>{item}</Text>
        }
        return <Text key={item} style={{textAlign:'center', fontSize:fontsize, backgroundColor:background[this.state.index.i][this.state.index.j], color}}>{item}</Text>

    })
  }

  render(){
      if(this.state.index.i == 0 && this.state.index.j == 0){
          console.log(this.state.value)
      }
      
      if(this.state.touchable){
          if(this.state.index == this.props.selected){
              if(this.state.value[this.props.index.i][this.props.index.j].length != 1){
                    return ( <TouchableWithoutFeedback onPress={this.onTab}>
                                    <View key={this.props.index} style={{width: width/9, height: width/10,borderColor:'black', borderWidth:1, justifyContent: 'space-around',backgroundColor:'#ffdddd', flexDirection:'row'}}>
                                    {this.renderValue(true)}
                                    </View>
                                </TouchableWithoutFeedback>
                        )
              }else{
                  return ( <TouchableWithoutFeedback onPress={this.onTab}>
                                    <View key={this.props.index} style={{width: width/9, height: width/10,borderColor:'black', borderWidth:1, justifyContent: 'center',backgroundColor:'#ffdddd'}}>
                                    {this.renderValue(true)}
                                    </View>
                                </TouchableWithoutFeedback>
                        )
              }
            }
            if(this.state.value[this.props.index.i][this.props.index.j].length != 1){
                return ( <TouchableWithoutFeedback onPress={this.onTab}>
                                <View key={this.props.index} style={{width: width/9, height: width/10,borderColor:'black', borderWidth:1,backgroundColor:background[this.state.index.i][this.state.index.j],flexDirection:'row', justifyContent: 'space-around'}}>
                                    {this.renderValue(false)}
                                </View>
                                
                            </TouchableWithoutFeedback> 
                )
            }
            else{
                return ( <TouchableWithoutFeedback onPress={this.onTab}>
                                <View key={this.props.index} style={{width: width/9, height: width/10,borderColor:'black', borderWidth:1,backgroundColor:background[this.state.index.i][this.state.index.j],justifyContent: 'center'}}>
                                    {this.renderValue(false)}
                                </View>
                                
                            </TouchableWithoutFeedback> 
                )
            }
      }
      else{
          return <View key={this.props.index} style={{width: width/9, height: width/10,borderColor:'black', borderWidth:1, justifyContent: 'center', backgroundColor:background[this.state.index.i][this.state.index.j]}}><Text style={{textAlign:'center', fontSize:width/15, fontWeight:'bold'}}>{this.state.value[this.state.index.i][this.state.index.j][0]}</Text></View>
      }
  }
}


