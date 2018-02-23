import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button} from 'react-native';

export default class OversPage extends Component {
	constructor(props){
		super(props);
		this.state = {
            
		}
	}
	press(e) {
        console.log(e)
        this.props.changeOvers(e);
        this.props.changeState("toss")
    }
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.instructions}>
					Select Overs
				</Text>
				<View style = {styles.welcome}>
					<Button
						onPress={()=>{this.press(2)}}
						title="2 OVERS  /  2 Wickets"
						color="black"
						accessibilityLabel="2 OVERS  /  2 Wickets"
					/>
				</View>
                <View style = {styles.welcome}>
					<Button
						onPress={()=>{this.press(3)}}
						title="3 overs  /  2 wickets"
						color="black"
						accessibilityLabel="3 overs  /  2 wickets"
					/>
				</View>
                <View style = {styles.welcome}>
					<Button
						onPress={()=>{this.press(5)}}
						title="5 overs  /  3 wickets"
						color="black"
						accessibilityLabel="5 overs  /  3 wickets"
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
        backgroundColor: '#5f27cd',
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
