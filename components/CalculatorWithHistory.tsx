import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

export default function CalculatorWithHistory() {
	const [number1, setNumber1] = useState<number | null>(null)
	const [number2, setNumber2] = useState<number | null>(null)
	const [resultHistory, setResultHistory] = useState<string[]>([])

	const history: string[] = []

	const handleCalculate = (operator: '+' | '-') => {
		switch (operator) {
			case '+':
				setNumber1(null)
				setNumber2(null)
				setResultHistory([
					...resultHistory,
					`${number1} + ${number2} = ${(number1 || 0) + (number2 || 0)}`,
				])
				break
			case '-':
				setNumber1(null)
				setNumber2(null)
				setResultHistory([
					...resultHistory,
					`${number1} - ${number2} = ${(number1 || 0) - (number2 || 0)}`,
				])
				break

			default:
				break
		}
	}
	return (
		<View style={styles.container}>
			<Text>Welcome to Super calculator!</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setNumber1(parseInt(value))}
					keyboardType='numeric'
					value={number1?.toString()}
				/>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setNumber2(parseInt(value))}
					keyboardType='numeric'
					value={number2?.toString()}
				/>
			</View>
			<View style={styles.inputContainer}>
				<View style={styles.button}>
					<Button
						color={'white'}
						title={'+'}
						onPress={() => handleCalculate('+')}
					/>
				</View>
				<View style={styles.button}>
					<Button
						color={'white'}
						title={'-'}
						onPress={() => handleCalculate('-')}
					/>
				</View>
			</View>
			<Text>{'History'}</Text>
			<View>
				{resultHistory.map((result, i) => {
					return <Text key={i}>{result}</Text>
				})}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
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
