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
import Sidebar from './src/components/sidebar/index';
import variables from './native-base-theme/variables.js'



const {height, width} = Dimensions.get('window');

export default class Sudoku extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <SudokuGame/>
    )
  }
}



AppRegistry.registerComponent('Sudoku', () => Sudoku);
