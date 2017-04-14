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
  Alert
} from 'react-native';
import {Spinner, StyleProvider, Drawer, Container, Header, Left, Icon, Body,Title,Right, Button} from 'native-base'
import getTheme from '../../../native-base-theme';
import variables from '../../../native-base-theme/variables';
import Sidebar from '../sidebar/index';
import Item from './item'
import Input from './input'
import Timer from '../timer/index'
import Sudoku from 'sudoku'

var inputcolumns = [1,2,3,4,5]
var columns = [1,2,3,4,5,6,7,8,9];
var inputs = [[1,2,3,4,5],[6,7,8,9,'C']]

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
    this.state = {selected : null, sudoku:[], input: null, solved: false, result: [], steps:0, done: false, restart:false}
    this.selected = this.selected.bind(this)
    this.input = this.input.bind(this)
    this.rerenderBoard = this.rerenderBoard.bind(this)
    this.timeWhenFinished = this.timeWhenFinished.bind(this)
  }
  componentWillMount(){
    this.getSudokuBoard()
  }
  rerenderBoard(){
    this.getSudokuBoard()
  }
  timeWhenFinished(time){
    this.setState({time})
  }
  getSudokuBoard(){
     var sudokupuzzle = []
     var result = []
      for(var i = 0; i < 100; i++){
      sudokupuzzle = Sudoku.makepuzzle()
      result = Sudoku.solvepuzzle(sudokupuzzle)
      var difficulty = Sudoku.ratepuzzle(sudokupuzzle, 1)

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
      if(value == "C"){
        this.state.sudoku[this.state.selected.i][this.state.selected.j] = []
      }
      if(this.state.selected != null && value != "C"){
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
      this.setState({done:true})
    }

    if(this.arraysEqual(flatten(this.state.sudoku),flatten(this.state.result))){
      this.setState({solved:true})
      var steps_message = 'It took you ' + this.state.steps + ' steps!'
      var time_message = 'It took you ' + this.state.time + ' to complete this puzzle'
      console.log(time_message)
      Alert.alert(
        'Solved!',
        'Succesfully solved the sudoku!',
        [
          {text: 'Play Again', onPress: this.rerenderBoard, style: 'cancel'},
        ],
        { cancelable: false }
      )
      this.setState({sudoku:[]})
    }

    this.setState({steps:this.state.steps +1})
  }

  renderInput(){
        return inputs.map((input, i) => {
          var column = inputcolumns.map((inputcolumn,j) => {
            return <Input key={j + i} value={inputs} index={{i,j}} callback={this.input}/> 
          })
        
           return (
            <View key={i} style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom:height/75}}>
              {column}
             </View> 
         ) 
        })
  }
         
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
     closeDrawer = () => {
        this.drawer._root.close()
      };
      openDrawer = () => {
       this.drawer._root.open()
      };

    if(this.state.restart){
      {this.rerenderBoard()}
    }

    if(this.state.sudoku.length == 0){
      return(
        <StyleProvider style={getTheme()}>
      
     <Drawer
        ref={(ref) => { this.drawer = ref }}
        content={<Sidebar/>}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        closedDrawerOffset={-3}
        styles={drawerStyles}
        panOpenMask={0.80}
        captureGestures="open"
        >
         <Container>
                <Header androidStatusBarColor={variables.statusBarColor}>
                    <Left>
                        <Button transparent onPress={() => openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Sudoku</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
        <View style={{justifyContent:'center', alignItems:'center'}}>  
          <Spinner color='red'/>
          <View>
            <Text>Loading Sudoku</Text>
          </View>
        </View>   
        </Container>
        </Drawer>
        </StyleProvider>  
      )
    }
    if(!this.state.restart){
    return (
       <StyleProvider style={getTheme()}>
      
     <Drawer
        ref={(ref) => { this.drawer = ref }}
        content={<Sidebar/>}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        closedDrawerOffset={-3}
        styles={drawerStyles}
        panOpenMask={0.80}
        captureGestures="open"
        >

          <Container>
                <Header androidStatusBarColor={variables.statusBarColor}>
                    <Left>
                        <Button transparent onPress={() => openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Sudoku</Title>
                    </Body>
                    <Right>
                    <Button transparent onPress={() => this.setState({sudoku:[]}, this.getSudokuBoard)}>
                            <Icon name='md-refresh' />
                        </Button>
                    </Right>
                </Header>
           <View style={{marginTop:height/75}}> 
        <View style={{marginBottom:height/75, alignItems:'center'}}>
        <Text style={{fontSize:20}}><Timer solved={this.state.solved}/></Text>
        </View>
        <View>
        {this.renderTile()}
        </View>
        <View style={{marginTop:height/75}}>
        {this.renderInput()}
        </View>
      </View>
        </Container>
      </Drawer>
    </StyleProvider>
     
    );
  }
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}



