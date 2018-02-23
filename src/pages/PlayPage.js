import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image} from 'react-native';

export default class PlayPage extends Component {
	constructor(props){
		super(props);
		this.state = {
            balls:0,
            targetShow:false,
            currentRuns:0,
            currentWickets:0,
            random:0,
            selected:0,
            totalWickets: 0,
            totalRuns:0,
            state:"runs",
            done:false,
            isVisible: false,
            firstInn: 0,
            // showMessage: true,
            // message:"Continue to next Innings"
		}
    }
    
    componentWillMount() {
        this.setState({
            b:this.props.overs*6,
            balls:this.props.overs*6,
            user:this.props.choice
        });
        if(this.props.overs==2 || this.props.overs==3){
            this.setState({
                totalWickets:2
            })
        } else {
            this.setState({
                totalWickets:3
            })
        }
        this.generate();
    }
    /**
     * this function is a timeout function which calls itself after every 1 ms if done is false
     * if done is true ...then it means that stop is selected and then the result is calculated based on random and selected value
     */
    generate() {
        setTimeout(()=>{
            if(!this.state.done)    //if nothing is selected then generate random numbers
            {
                this.setState({
                    random:Math.ceil(Math.random()*6)
                });
                this.generate();
            } else {                // something is selected
                if(this.state.random!==this.state.selected) {   //number selected and random number is not same.. It means someone scored
                    let total =this.state.user==0?this.state.currentRuns+this.state.selected:this.state.currentRuns+this.state.random;  //if user is batting add selected number to the total runs                   
                    if(this.state.targetShow){              //if second innings...
                        if(total > this.state.totalRuns){    // if current runs will be more than total runs... then display message that batsman won
                            setTimeout(()=>{
                                this.setState({
                                    showMessage:true,
                                    message:this.state.user==0?"YOU WON BY SCORING MORE":"CPU WON BY SCORING MORE",
                                    targetShow:false,
                                })
                            },900)
                            
                        } else if((total == this.state.totalRuns) && (this.state.balls == 0)) {
                            setTimeout(()=>{
                                this.setState({
                                    showMessage:true,
                                    message:"DRAW",
                                    targetShow:false
                                })
                            },900)
                            
                        } 
                    } 
                    this.setState({
                        isVisible:true,
                        state :"runs",
                        currentRuns:total
                    })
                    

                } else {                                        //random number and selected number is same... It means wicket
                    if((this.state.currentWickets + 1) >= this.state.totalWickets){

                        if(this.state.targetShow){              //if 2nd innings then show message that the batting team lost since all the wickets are over and display who won
                            setTimeout(()=>{
                                this.setState({
                                    showMessage: true,
                                    message:this.state.user==0?"CPU WON BY ALL OUT":"YOU WON BY ALL OUT",
                                    targetShow:false
                                })
                            },900)
                        } else {                                //if 1st innings the show message that second innings is going to start and reset all values
                            setTimeout(()=>{
                                this.setState({
                                    totalRuns:this.state.currentRuns,
                                    currentRuns:0,
                                    currentWickets:0,
                                    user:this.state.user==0?1:0,
                                    balls:this.state.b,
                                    targetShow: true,
                                    showMessage:true,
                                    message:"Continue to next Innings due to all out"
                                })
                            },900)
                            
                        }
                        this.setState({
                            isVisible:true,
                            state : "wicket",
                            currentWickets : this.state.currentWickets + 1
                        })
                    } else {
                        this.setState({
                            isVisible:true,
                            state : "wicket",
                            currentWickets : this.state.currentWickets + 1
                        })
                    }
                    

                }
                
            }
        },1)
    }
    continue(){
        console.log(this.state.targetShow,"this is target show")
        if(!this.state.targetShow){
            this.props.changeState("start")
        } else {
            this.setState({
                showMessage:false,
                selected:0
            })
        }
    }
    /**
     * if there is no message on screen then this function is used to set done to true so that it checks in generate function for result
     * then after 1 sec done is set to false
     * also after 1.2 sec isVisible is set to false 
     * @param {number} selected 
     */
    stop(selected){
        if(!this.state.isVisible){
            this.setState({
                selected,
                done:true,
                balls: this.state.balls -1
            },()=>{
                let total =this.state.user==0?this.state.currentRuns+this.state.selected:this.state.currentRuns+this.state.random;
                
                if(this.state.targetShow){
                    if(this.state.balls==0 && total<this.state.totalRuns){
                        setTimeout(()=>{
                            this.setState({
                                showMessage:true,
                                message:this.state.user==0?"CPU WON BY MORE":"YOU WON BY MORE",
                                targetShow:false
                            })
                        },900)
                        
                    } else if(this.state.balls==0 && total==this.state.totalRuns){
                        setTimeout(()=>{
                            this.setState({
                                showMessage:true,
                                message:"DRAW"
                            })
                        },900)
                        
                    } else {
                        setTimeout(()=>{
                            this.setState({
                                done: false
                            },()=>{
                                this.generate()
                            })
                        },1000)
                        setTimeout(()=>{
                            this.setState({
                                isVisible:false,
                            })
                        },1200)
                    }
                } else {
                    if(this.state.balls==0){
                        setTimeout(()=>{
                            this.setState({
                                totalRuns:this.state.currentRuns,
                                currentRuns:0,
                                currentWickets:0,
                                user:this.state.user==0?1:0,
                                balls:this.state.b,
                                targetShow: true,
                                showMessage:true,
                                message:"Continue to next Innings bcoz end of overs"
                            })
                        },900)
                        
                        
                    }
                    setTimeout(()=>{
                        this.setState({
                            done: false
                        },()=>{
                            this.generate()
                        })
                    },1000)
                    setTimeout(()=>{
                        this.setState({
                            isVisible:false,
                        })
                    },1200)
                }
                
                
                
                
                
            });
            
        }
        
    }

    renderChoices(){
        const list = [1,2,3,4,5,6];
        let mappedList = [];
        list.map((element,i)=>{
            mappedList.push(
                <Text 
                    style={this.state.selected===element?styles.elementActive:styles.elementInactive} 
                    key = {element} 
                    onPress={()=>{this.stop(element)}}
                >
                    {element}
                </Text>
            )
        });
        return mappedList;
    }
    
    renderMessage() {
        if(this.state.state=="runs") {
            if(this.state.user==0) {
                return (
                    this.state.selected + " RUNS"
                )
            } else {
                return (
                    this.state.random + " RUNS"
                )
            }

        } else {
            return ("WICKET!!!")
        }
    }

	oversPress(){
		this.props.changeState("overs")
	}
	render() {
		return (
			<View style={styles.container}>
                <View style={styles.top}>
                    {this.state.user==0
                        ?<Image
                            style={[{width: 20, height: 50, marginLeft:20},{position:'absolute'}]}
                            source={require('../images/bat.png')}
                            />
                        :<Image
                            style={[{width: 35, height: 70, marginLeft:20},{position:'absolute'}]}
                            source={require('../images/ball.png')}
                            />
                    }
                    <Text style={styles.instructions}>
					    Balls Left:{this.state.balls}
				    </Text>
                </View>
                {this.state.targetShow
                    ?   <View style={styles.firstInn}>
                            <Text style={styles.innText}>1st Innings: {this.state.totalRuns}</Text>
                        </View>
                    :null
                }
                <View style={{width:'100%', alignItems:'center', height:'100%',backgroundColor:'red'}}>
                    <Text style={styles.instructions}>
                        {this.state.currentRuns}/{this.state.currentWickets}
                    </Text>
                    <Text style = {styles.numberDisp}>
                        {this.state.random}
                    </Text>
                    <Text style={[styles.instructions,{padding:10}]}>
                        {
                            this.state.isVisible
                            ?this.renderMessage()
                            :null

                        }
                    </Text>
                    <View style={styles.choices}>
                        {this.renderChoices()}
                    </View>
                </View>
                {this.state.showMessage
                ?<View style={styles.popup}>
                    <Text onPress={()=>{this.continue()}} style={styles.message}>{this.state.message}</Text>
                </View>
                :null
                }
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor: '#ff793f',
        width:'100%'
    },
    message:{
        textAlign:'center',
        width:'100%',
        fontSize:30,
        color:'white'
    },
    innText:{
        backgroundColor:'black',
        color: 'white',
        padding: 10
    },
    popup:{
        justifyContent:'center',
        flex:1,
        width: '100%',
        height: '100%',
        backgroundColor: 'purple',
        position: 'absolute',
        zIndex:3
    },
    firstInn:{
        top:100,
        right:0,
        position:'absolute',
        zIndex:2 
    },
    top: {
        width:'100%',
        justifyContent:'center',
        height:100,
        backgroundColor: '#192a56',
    },
	instructions: {
        padding:40,
		textAlign: 'center',
		color: '#fff',
		fontSize: 30,
		marginBottom: 5,
    },
    choices: {
        flexDirection: 'row', 
        bottom:150, 
        position: 'absolute', 
        left:13
    },
    numberDisp: { 
        fontSize: 30,
        paddingTop: 25,
        marginTop: 20,
        width:100,
        height:100,
        backgroundColor: 'yellow',
        color: '#000',
        justifyContent: 'center',
        textAlign: 'center'
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
        backgroundColor: '#34ace0',
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
        backgroundColor: 'black',
        color: '#fff'
    },
});
