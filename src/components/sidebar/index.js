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

    }

    render() {
        return (
            <Container style={{backgroundColor:"#ffffff"}}>
                <Content> 
                    <ListItem>
                        <Text>More coming soon!</Text>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}