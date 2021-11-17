import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import * as Speech from 'expo-speech'
import CustomButton from './CustomButton'

export default function TextToSpeech() {
	const [text, setText] = useState<string>('')
	const speak = () => {
		Speech.speak(text)
	}
	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<View>
					<Text>{'What you want to hear?'}</Text>
					<TextInput
						style={styles.input}
						onChangeText={(value) => setText(value)}
						value={text}
					/>
				</View>
				<View style={styles.button}>
					<CustomButton text={'Listen'} handlePress={() => speak()} />
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 20,
	},
	inputContainer: {
		marginTop: 20,
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'center',
		fontSize: 20,
	},
	input: {
		width: 200,
		color: 'black',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
		borderColor: 'black',
		borderWidth: 2,
		padding: 10,
	},
	amountInput: {
		width: 75,
	},
	button: {
		marginVertical: 10,
	},
})
