import React, { useState } from 'react'
import {
	Button,
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'

export default function ShoppingList() {
	const [listText, setListText] = useState<string>('')
	const [list, setList] = useState<string[]>([])

	return (
		<View style={styles.container}>
			<Text>Welcome to Shopping list!</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setListText(value)}
					value={listText}
				/>
			</View>
			<View style={styles.inputContainer}>
				<View style={styles.button}>
					<Button
						color={'white'}
						title={'Add'}
						onPress={() => {
							setList([...list, listText])
							setListText('')
						}}
					/>
				</View>
				<View style={styles.button}>
					<Button color={'white'} title={'Clear'} onPress={() => setList([])} />
				</View>
			</View>
			<Text style={styles.shoppinglistItem}>{'Shopping list'}</Text>
			<FlatList
				data={list}
				renderItem={({ item }) => <Text key={item}>{item}</Text>}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
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
	shoppinglistItem: {
		color: 'blue',
		marginVertical: 10,
		fontSize: 20,
	},
})
