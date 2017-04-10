/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import SudokuGame from './src/components/sudokumap/index';
import {Drawer,Header,Left,Button,Right,Icon,Body,Title, Container, Content, ListItem, Text, CheckBox } from 'native-base';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Sidebar from './src/components/sidebar/index';



export default class Sudoku extends Component {
  constructor(props){
    super(props)
    this.state = {rerender:false}
    this.restart = this.restart.bind(this)
  }
  restart(){
    console.log("restart")
    this.setState({rerender:true}, () => {this.setState({rerender:false})})
  }
  render(){
     closeDrawer = () => {
        this.drawer._root.close()
      };
      openDrawer = () => {
       this.drawer._root.open()
      };

    return (
      <Drawer
              ref={(ref) => { this.drawer = ref }}
              content={<Sidebar restart={this.restart}/>}
              onClose={() => closeDrawer()} >
          
          <Container>
                <Header>
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
          <SudokuGame restart={this.state.rerender}/>
        </Container>
      </Drawer>
    )
  }
}

AppRegistry.registerComponent('Sudoku', () => Sudoku);
