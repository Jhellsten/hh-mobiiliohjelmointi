import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { RouteNavigationProps } from '../App'
import CustomButton from './CustomButton'

export default function Calculator({
	navigation,
}: RouteNavigationProps<'Calculator'>) {
	const [number1, setNumber1] = useState<number | null>(null)
	const [number2, setNumber2] = useState<number | null>(null)
	const [result, setResult] = useState<number | null>(null)
	const [numberList, setNumberlist] = useState<string[]>([])

	const handleCalculate = (operator: '+' | '-') => {
		switch (operator) {
			case '+':
				setResult((number1 || 0) + (number2 || 0))
				setNumberlist([
					...numberList,
					`${number1} + ${number2} = ${(number1 || 0) + (number2 || 0)}`,
				])
				break
			case '-':
				setResult((number1 || 0) - (number2 || 0))
				setNumberlist([
					...numberList,
					`${number1} - ${number2} = ${(number1 || 0) - (number2 || 0)}`,
				])
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
			<View style={styles.buttonContainer}>
				<CustomButton text={'+'} handlePress={() => handleCalculate('+')} />
				<CustomButton text={'-'} handlePress={() => handleCalculate('-')} />
				<CustomButton
					text={'History'}
					handlePress={() => navigation.navigate('History', { numberList })}
				/>
			</View>
			{result !== null && <Text>{result.toString()}</Text>}
		</View>
	)
}

export const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	buttonContainer: {
		width: '60%',
		marginBottom: 20,
		flexDirection: 'row',
		justifyContent: 'center',
	},
})
