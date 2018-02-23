import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button} from 'react-native';

export default class TossResult extends Component {
	constructor(props){
		super(props);
		this.state = {
            choice: "Bat",
            cpChoice:1
		}
    }
    
    componentWillReceiveProps(nextProps) {
        const ch = ["Bowl","Bat"]
        if(nextProps.result===0){
            
            let r = Math.ceil(Math.random()*2);
            console.log(r);
            this.setState({
                cpChoice:r-1,
                choice:ch[r-1]
            })
        }
    }
    
    btnPress(e){
        if(e==2){
            console.log(this.state.cpChoice,"cpu choice")
            this.props.changeChoice(this.state.cpChoice);
        } else {
            this.props.changeChoice(e);
        }
        
    }
	renderDisplay(){
        if(this.props.result===1){
            return (
                <View style={styles.container}>
                    <Text style={styles.message}>
                        {this.props.sum}
                    </Text>
                    <Text style={styles.message}>
                        You Won the toss!!
                    </Text>
                    <Text style={styles.message}>
                        Choose one of the following
                    </Text>
                    <View style={styles.button}>
                        <Button
                                onPress={()=>{this.btnPress(0)}}
                                title="Batting"
                                color="#841584"
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                                onPress={()=>{this.btnPress(1)}}
                                title="Bowling"
                                color="#841584"
                        />
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.message}>
                        {this.props.sum}
                    </Text>
                    <Text style={styles.message}>
                        You Lost the toss!!
                    </Text>
                    <Text style={styles.message}>
                        CPU chose to : {this.state.choice}
                    </Text>
                    <View style={styles.button}>
                        <Button
                                onPress={()=>{this.btnPress(2)}}
                                title="Continue"
                                color="#841584"
                        />
                    </View>
                </View>
            )
        }
        
    }
	render() {
		return (
            <View style={styles.container}>
                {this.renderDisplay()}
            </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        justifyContent: 'center',
        position: 'absolute',
        alignItems: 'center',
        zIndex: 2,
        padding: 20,
		backgroundColor: '#222f3e',
        width:'100%',
        height: '100%'
    },
    message: {
        padding:10,
        fontSize:20,
        color: 'white'
    },
    button: {
        width:'70%',
        margin: 10
    }
});
