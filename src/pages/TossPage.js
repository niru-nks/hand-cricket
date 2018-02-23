import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button} from 'react-native';

import TossResult from '../components/TossResult'

export default class TossPage extends Component {
	constructor(props){
		super(props);
		this.state = {
            toss:false,
            call:"EVEN",
            random: 4,
            selected: 0,
            done:false,
            selected: 0,
            isVisible: false,
            result:2
		}
    }
    generate(){
        // if(!this.state.done) {
        //     this.setState({

        //     })
        // }
        setTimeout(()=>{
            if(!this.state.done)
            {
                this.setState({
                    random:Math.ceil(Math.random()*6)
                });
                this.generate();
            }
        },10)
        
    }
	evenPress() {
        this.setState({
            toss:true,
            call:"EVEN",
            done:false
        },()=>{
            this.generate()
        })
    }
    oddPress() {
        this.setState({
            toss:true,
            call:"ODD",
            done:false
        },()=>{
            this.generate();
        })
    }
    stop(selected){
        // this.setState({                          //this is for non stop game
        //     done:!this.state.done,
        //     selected
        // },()=>{
        //     this.generate()
        // })
        this.setState({
            done: true,
        })
        if(this.state.selected===0) {
            this.setState({
                selected
            },()=>{ this.decideResult()})
        }
    }
    decideResult(){
        const sum = this.state.selected + this.state.random;
        setTimeout(()=>{
            this.setState({
                isVisible:true,
                sum
            })
            if((sum)%2==0){
                if(this.state.call === "EVEN"){
                    this.setState({
                        result: 1,
                    })
                } else {
                    this.setState({
                        result: 0,
                    })
                }
            } else {
                if(this.state.call === "ODD") {
                    this.setState({
                        result:1
                    })
                }
                else {
                    this.setState({
                        result: 0
                    })
                }
            }
        },2000)
        

    }
    back(){
        console.log(this.state.toss)
        this.setState({
            selected:0
        })
        if(!this.state.toss) {
            this.setState({
                toss:false
            })
            this.props.changeState("start")
        } else {
            this.setState({
                toss:false
            })
        }
    }
    renderView() {
        return (
            !this.state.toss
            ?
            <View style={[styles.container,styles.innerView]}>
                <Text style={styles.instructions}>
                    Select Odd or Even
                </Text>
                <View style = {styles.welcome}>
                    <Button
                        onPress={()=>{this.oddPress()}}
                        title="Odd"
                        color="#841584"
                    />
                </View>
                <View style = {styles.welcome}>
                    <Button
                        onPress={()=>{this.evenPress()}}
                        title="Even"
                        color="#841584"
                    />
                </View>
            </View>
            :
            <View style={{width:'100%', alignItems:'center', height:'100%'}}>
                <View style={styles.innerView}>
                    <Text style={styles.head}>
                        Your Choice : {this.state.call}
                    </Text>
                </View>
                <Text style = {styles.numberDisp}>
                    {this.state.random}
                </Text>
                <View style={styles.choices}>
                    {this.renderChoices()}
                </View>
                
            </View>
        )
        
    }
    renderChoices(){
        const list = [1,2,3,4,5,6];
        let mappedList = [];
        list.map((element,i)=>{
            mappedList.push(
                <Text style={this.state.selected===element?styles.elementActive:styles.elementInactive} key = {element} onPress={()=>{this.stop(element)}}>
                    {element}
                </Text>
            )
        });
        return mappedList;
    }
    play() {
        this.props.changeState("play")
    }
    changeChoice(val) {
        this.props.changeChoice(val);
        this.props.changeState("play")
    }
	render() {
		return (
			<View style={[styles.container,styles.outerView]}>
				<Text style={styles.heading}>
					Toss
				</Text>
                {this.state.isVisible
                    ?<TossResult 
                        result={this.state.result} 
                        sum={this.state.sum}
                        changeChoice={val=>this.changeChoice(val)}/>
                    :null
                }
                {this.renderView()}
                
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        position: 'relative',
        // justifyContent:'center',
		alignItems: 'center',
        backgroundColor: '#f1c40f',
        
    },
    choices: {
        flexDirection: 'row', 
        bottom:50, 
        position: 'absolute', 
        left:13
    },
    elementInactive: {
        borderWidth:1,
        borderColor: '#fff',
        width:'15%',
        height:100,
        margin:2,
        padding: 5,
        justifyContent:'center',
        textAlign: 'center',
        backgroundColor: '#eb4d4b',
        color: '#fff'
    },
    elementActive: {
        borderWidth:1,
        borderColor: '#fff',
        width:'15%',
        height:100,
        margin:2,
        padding: 5,
        justifyContent:'center',
        textAlign: 'center',
        backgroundColor: '#30336b',
        color: '#fff'
    },
    numberDisp: { 
        fontSize: 30,
        paddingTop: 25,
        marginTop: 50,
        width:100,
        height:100,
        backgroundColor: '#2ecc71',
        color: '#fff',
        justifyContent: 'center',
        textAlign: 'center'
    },
    outerView: {
        flex:1,
        width:'100%'
    },
    innerView: {
        marginTop:150,
        width:'90%',
        backgroundColor:'#2980b9',
        padding:10
    },
	welcome: {
        margin: 10,
        width: '40%'
	},
	instructions: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 30,
		marginBottom: 5,
    },
    heading: {
        position: 'absolute',
        top:'10%',
        textAlign: 'center',
		color: '#c0392b',
		fontSize: 40,
		marginBottom: 5,
    },
    head: {
        textAlign: 'center',
		color: '#fff',
		fontSize: 25,
        width:'100%'
    }
});
