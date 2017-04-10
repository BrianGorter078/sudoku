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
  TouchableWithoutFeedback,
  Alert,
  Button
} from 'react-native';
import Item from './item'
import Input from './input'
import Timer from '../timer/index'
import Sudoku from 'sudoku'

var columns = [1,2,3,4,5,6,7,8,9];

var {height, width} = Dimensions.get('window');

const flatten = arr => arr.reduce(
  (acc, val) => acc.concat(
    Array.isArray(val) ? flatten(val) : val
  ),
  []
);

export default class sudokumap extends Component {
  constructor(props){
    super(props)
    this.state = {selected : null, sudoku:[], input: null, solved: false, result: [], steps:0, restart:false, done: false}
    this.selected = this.selected.bind(this)
    this.input = this.input.bind(this)
    this.rerenderBoard = this.rerenderBoard.bind(this)
  }
  componentWillMount(){
    this.setState({restart:this.props.restart})
    this.getSudokuBoard()
  }
  rerenderBoard(){
     this.setState({solved:false, sudoku:[], restart: true}, () => this.getSudokuBoard())
  }
  getSudokuBoard(){
     var sudokupuzzle = []
     var result = []
    for(var i = 0; i < 100; i++){
      sudokupuzzle = Sudoku.makepuzzle()
      result = Sudoku.solvepuzzle(sudokupuzzle)
      var difficulty = Sudoku.ratepuzzle(sudokupuzzle, 1)
      console.log(difficulty)
      if(difficulty == 0){
          break 
      }
    }
   
    sudokupuzzle = sudokupuzzle.map(item =>{
      return (item != null ? item+1 : null)
    })

    result = result.map(item => {
      return item+1
    })

    var sudoku = new Array(9)
    var results = new Array(9)

    var beginvalue = 0
    for (var i = beginvalue, j=beginvalue+9, step=0; i < sudokupuzzle.length;  i+=9, j+=9, step++){
      var resultitems = result.slice(i,j)
      var items = sudokupuzzle.slice(i,j)
      for(var k = 0; k < items.length; k++){
        var resultitem = []
        var value = []
        resultitem.push(resultitems[k])
        value.push(items[k])
        resultitems[k] = resultitem
        items[k] = value
      }
      sudoku[step] = items
      results[step] = resultitems
    }

    this.setState({sudoku, result:results, restart:false})

  }
  arraysEqual(a1,a2) {
    return JSON.stringify(a1)==JSON.stringify(a2);
  }

  selected(value){
    this.setState({selected : value})
  }

  input(value){

    if(this.state.selected != null){
      if(this.state.sudoku[this.state.selected.i][this.state.selected.j].indexOf(value) == -1){
        this.state.sudoku[this.state.selected.i][this.state.selected.j].push(value)
        if(this.state.sudoku[this.state.selected.i][this.state.selected.j].indexOf(null) > -1){
          this.state.sudoku[this.state.selected.i][this.state.selected.j].splice(this.state.sudoku[this.state.selected.i][this.state.selected.j].indexOf(null),1)
        }
      }else{
          this.state.sudoku[this.state.selected.i][this.state.selected.j].splice(this.state.sudoku[this.state.selected.i][this.state.selected.j].indexOf(value),1)
      }
      if(this.state.sudoku[this.state.selected.i][this.state.selected.j].length == 0){
        this.state.sudoku[this.state.selected.i][this.state.selected.j].push(null)
      }
    }

    var done = []
    for(var i = 0;i < this.state.sudoku.length;i++){
      for(var j = 0; j < this.state.sudoku[i].length; j++){
        if(this.state.sudoku[i][j].indexOf(null) > -1){
          done.push(this.state.sudoku[i][j].indexOf(null))
        }
      }
    }
    if(done.length == 0){
      console.log("Doneee")
      this.setState()
    }

    if(this.arraysEqual(flatten(this.state.sudoku),flatten(this.state.result))){
      this.setState({solved:true})
      Alert.alert(
        'Solved!',
        'Succesfully solved the sudoku!',
        [
          {text: 'Play Again', onPress: this.rerenderBoard, style: 'cancel'},
        ],
        { cancelable: false }
      )
    }

    this.setState({steps:this.state.steps++})
  }

  renderInput(){
        var column = columns.map(column => {return <Input key={column} value={column} callback={this.input}/> })
         return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:height/20}}>
              {column}
             </View> 
         )  }
         
  renderTile(){ 
        return columns.map((columnumber, i)=> {
         var rows = this.state.sudoku.map((rowitem, j) => {
           return <Item key={j + i} index={{i,j}} value={this.state.sudoku} callback={this.selected} selected={this.state.selected} input={this.state.input} done={this.state.done} solvedValue={this.state.result}/>
          })
         return (
            <View key={i}style={{flexDirection: 'row', justifyContent: 'space-between',marginLeft:1}}>
              {rows}
             </View> 
         )
       })
  }
  render() {
    if(this.state.restart){
      console.log("restaaaaarttt")
      {this.rerenderBoard()}
    }

    if(!this.state.restart){
    return (
      <View style={{marginTop:height/75}}> 
        <View style={{marginBottom:height/75, alignItems:'center'}}>
        <Text style={{fontSize:20}}><Timer solved={this.state.solved}/></Text>
        </View>
        <View>
        {this.renderTile()}
        </View>
        <View>
        {this.renderInput()}
        </View>
      </View>
    );
  }
  else{
    return (
      <View></View>
    )
  }
  }
}



