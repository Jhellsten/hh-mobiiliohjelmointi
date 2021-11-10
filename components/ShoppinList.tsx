import React, { useEffect, useState } from 'react'
import {
	Button,
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {
	deleteItem,
	saveItem,
	ShoppingListItem,
	ShoppingListItemSaveType,
	ShoppingListType,
	updateList,
} from '../services/db'
import CustomButton from './CustomButton'

export default function ShoppingList() {
	const [listText, setListText] = useState<string>('')
	const [listAmount, setListAmount] = useState<string>('')
	const [list, setList] = useState<ShoppingListItem[]>([])

	useEffect(() => {
		try {
			updateList(setList)
		} catch (error) {
			alert(error)
		}
	}, [])

	const handleSaveItem = (item: ShoppingListItemSaveType) => {
		try {
			saveItem(item)
			setListAmount('')
			setListText('')
			updateList(setList)
		} catch (error) {
			alert(error)
		}
	}

	console.log(list)
	return (
		<View style={styles.container}>
			<Text>Welcome to Shopping list!</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setListText(value)}
					value={listText}
				/>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setListAmount(value)}
					value={listAmount}
					keyboardType={'number-pad'}
				/>
			</View>
			<View style={styles.inputContainer}>
				<View style={styles.button}>
					<CustomButton
						text={'Save'}
						handlePress={() => {
							handleSaveItem({ product: listText, amount: listAmount })
							updateList(setList)
						}}
					/>
				</View>
			</View>
			<Text style={styles.shoppinglistItem}>{'Shopping list'}</Text>
			<FlatList
				data={list}
				contentContainerStyle={{
					flex: 1,
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
				renderItem={({ item }: any) => {
					console.log(item)
					return (
						<View key={item.id} style={styles.itemStyle}>
							<Text style={styles.shoppinglistItem} key={item.id}>
								{item.product}, {item.amount}
							</Text>
							<Text
								onPress={() => deleteItem(item.id)}
								style={styles.itemTextStyle}
							>
								{'Bought'}
							</Text>
						</View>
					)
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 20,
	},
	inputContainer: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'center',
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
		width: '40%',
		marginVertical: 10,
	},
	shoppinglistItem: {
		color: 'blue',
		marginVertical: 10,
		fontSize: 20,
	},
	itemStyle: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '70%',
	},
	itemTextStyle: {
		marginLeft: 'auto',
		color: 'green',
		fontSize: 12,
	},
})
