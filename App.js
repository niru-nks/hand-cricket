/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

import StartPage from './src/pages/StartPage';
import TossPage from './src/pages/TossPage';
import OversPage from './src/pages/OversPage';
import PlayPage from './src/pages/PlayPage';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: "start",
			overs: 2,
			choice:4
		}
	}

	renderPage() {
		switch (this.state.page) {
			case "start":
				return (<StartPage 
							changeState={page => this.changeState(page)} 
						/>);
			case "toss":
				return (<TossPage 
							changeState={page => this.changeState(page)} 
							overs={this.state.overs} 
							changeChoice = {choice => this.changeChoice(choice)}
						/>);
			case "overs":
				return (<OversPage 
							changeState={page => this.changeState(page)} 
							changeOvers={overs => this.changeOvers(overs)}
						/>);
			case "play":
				return (
					<PlayPage 
						overs = {this.state.overs}
						choice = {this.state.choice}
						changeState={page => this.changeState(page)} 
					/>
				)
			default:
				return (
					<StartPage 
						changeState={page => this.changeState(page)} 
					/>
				)
		}

	}
	changeChoice(choice) {
		this.setState({
			choice
		},()=>{
			console.log("this is what the user is going to do",this.state.choice);
			console.log("0 for batting 1 for bowling");
		})
	}
	changeOvers(overs) {
		this.setState({
			overs
		})
	}
	changeState(page) {
		this.setState({
			page
		})
	}
	render() {
		return (
			<View style={styles.container}>
				{this.renderPage()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#3498db',
	},
});
