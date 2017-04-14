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
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native';
import SudokuGame from './src/components/sudokumap/index';
import {Drawer,Header,Left,Button,Right,Icon,Body,Title, Container, Content, ListItem, Text, CheckBox, StyleProvider} from 'native-base';
import getTheme from './native-base-theme';
import Sidebar from './src/components/sidebar/index';
import variables from './native-base-theme/variables.js'



const {height, width} = Dimensions.get('window');

export default class Sudoku extends Component {
  constructor(props){
    super(props)
    this.state = {rerender:false}
  }
  render(){
     closeDrawer = () => {
        this.drawer._root.close()
      };
      openDrawer = () => {
       this.drawer._root.open()
      };
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
                    </Right>
                </Header>
          <SudokuGame/>
        </Container>
      </Drawer>

    </StyleProvider>


    )
  }
}


const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

AppRegistry.registerComponent('Sudoku', () => Sudoku);
