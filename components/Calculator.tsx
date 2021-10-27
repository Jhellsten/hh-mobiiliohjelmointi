import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

export default function Calculator() {
	const [number1, setNumber1] = useState<number | null>(null)
	const [number2, setNumber2] = useState<number | null>(null)
	const [result, setResult] = useState<number | null>(null)

	const handleCalculate = (operator: '+' | '-') => {
		switch (operator) {
			case '+':
				setResult((number1 || 0) + (number2 || 0))
				break
			case '-':
				setResult((number1 || 0) - (number2 || 0))
				break

			default:
				break
		}
	}
	return (
		<View style={styles.container}>
			<Text>Welcome to basic calculator!</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setNumber1(parseInt(value))}
					keyboardType='numeric'
				/>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setNumber2(parseInt(value))}
					keyboardType='numeric'
				/>
			</View>
			<View style={styles.inputContainer}>
				<View style={styles.button}>
					<Button title={'+'} onPress={() => handleCalculate('+')} />
				</View>
				<View style={styles.button}>
					<Button title={'-'} onPress={() => handleCalculate('-')} />
				</View>
			</View>
			{result !== null && <Text>{result.toString()}</Text>}
		</View>
	)
}

export const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputContainer: {
		flexDirection: 'row',
		alignContent: 'center',
		width: '60%',
		fontSize: 20,
	},
	input: {
		width: '50%',
		color: 'black',
		margin: 10,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
		borderColor: 'black',
		borderWidth: 2,
		padding: 10,
	},
	button: {
		width: '25%',
		color: 'black',
		margin: 10,
		backgroundColor: 'blue',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
	},
})
