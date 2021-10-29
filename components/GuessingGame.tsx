import React, { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { styles } from './Calculator'
import CustomButton from './CustomButton'

export default function GuessingGame() {
	const [number, setNumber] = useState<number | null>(null)
	const [text, setText] = useState<string>('Guess a number between 1-100')
	const [answer] = useState<number>(Math.floor(Math.random() * 100) + 1)

	const handleGuess = () => {
		console.log(number, answer)
		if ((number || 0) > answer) {
			setText(`Your guess ${number} is too high`)
		} else if ((number || 0) < answer) {
			setText(`Your guess ${number} is too low`)
		} else if ((number || 0) == answer) {
			setText(`Your guess ${number} is correct`)
			alert('Correct guess!')
		}
	}
	return (
		<View style={styles.container}>
			<Text>Welcome to Guessing game</Text>
			{text && <Text>{text}</Text>}
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setNumber(parseInt(value))}
					keyboardType='numeric'
				/>
			</View>
			<View>
				<View>
					<CustomButton text={'Make a guess'} handlePress={handleGuess} />
				</View>
			</View>
		</View>
	)
}
