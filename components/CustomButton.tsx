import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Button, Icon } from 'react-native-elements'

interface Props {
	handlePress: (...args: any[]) => any
	text: string
	icon?: string
}

const CustomButton = ({ handlePress, text, icon }: Props) => {
	return icon ? (
		<Button
			title={text}
			titleStyle={styles.buttonText}
			onPress={() => handlePress('-')}
			// style={styles.button}
			icon={<Icon name={icon} size={20} color={'white'} />}
		></Button>
	) : (
		<Button
			title={text}
			titleStyle={styles.buttonText}
			onPress={() => handlePress('-')}
			// style={styles.button}
		></Button>
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
		paddingLeft: 10,
	},
})
