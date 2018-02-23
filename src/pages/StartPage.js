import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button} from 'react-native';

export default class StartPage extends Component {
	constructor(props){
		super(props);
		this.state = {
		
		}
	}
	oversPress(){
		this.props.changeState("overs")
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.instructions}>
					Let's Get Started!!
				</Text>
				<View style = {styles.welcome}>
					<Button
						onPress={()=>{this.oversPress()}}
						title="Onward to choose overs ->"
						color="#841584"
						accessibilityLabel="Learn more about this purple button"
					/>
				</View>
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
        width:'100%'
	},
	welcome: {
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 30,
		marginBottom: 5,
	},
});
