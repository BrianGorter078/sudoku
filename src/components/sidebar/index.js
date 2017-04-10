import React, { Component } from 'react';
import {Dimensions, Image, View, TouchableWithoutFeedback, Text} from 'react-native';
import { Container, Content, Icon, List, ListItem, Thumbnail} from 'native-base';
import image from '../../../assets/images/sudoku.png';

export default class sidebar extends Component {
    constructor(props){
        super(props)
        this.onPress = this.onPress.bind(this)
    }
    onPress(){
        console.log("onpereee")
        this.props.restart()
    }

    render() {
        return (
            <Container style={{backgroundColor:"#ffffff"}}>
                
                  <Content style={{marginTop:20}}>
                    <View style={{flex:1, marginLeft:10, marginRight:10}}>
                    <Image source={image}/>
                    </View>
                    <ListItem>
                        <TouchableWithoutFeedback onPress={this.onPress}><Text>Restart Game</Text></TouchableWithoutFeedback>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}