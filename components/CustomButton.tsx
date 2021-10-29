import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface Props {
	handlePress: (...args: any[]) => any
	text: string
}

const CustomButton = ({ handlePress, text }: Props) => {
	return (
		<TouchableOpacity onPress={() => handlePress('-')} style={styles.button}>
			<Text style={styles.buttonText}>{text}</Text>
		</TouchableOpacity>
	)
}

export default CustomButton

export const styles = StyleSheet.create({
	button: {
		minWidth: '10%',
		marginHorizontal: 10,
		paddingVertical: 12,
		paddingHorizontal: 10,
		backgroundColor: 'blue',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
	},
	buttonText: {
		color: 'white',
	},
})
