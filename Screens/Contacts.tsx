import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import * as Contacts from 'expo-contacts'
import * as SMS from 'expo-sms'
import CustomButton from '../components/CustomButton'

export default function ContactList() {
	const [listText, setListText] = useState<string>('')
	const [listAmount, setListAmount] = useState<string>('')
	const [list, setList] = useState<Contacts.Contact[]>([])

	const getContacts = async () => {
		const { status } = await Contacts.requestPermissionsAsync()
		if (status === 'granted') {
			const { data } = await Contacts.getContactsAsync({
				fields: [Contacts.Fields.PhoneNumbers],
			})
			if (data.length) {
				const sorted = data.sort((a, b) => {
					const nameA = a.firstName ? a.firstName.toUpperCase() : ''
					const nameB = b.firstName ? b.firstName.toUpperCase() : ''
					if (nameA < nameB) {
						return -1
					}
					if (nameA > nameB) {
						return 1
					}
					// names must be equal
					return 0
				})
				setList(sorted.slice(0, 100))
			}
		}
	}

	const sendSms = async () => {
		const isSMSAvailable = await SMS.isAvailableAsync()
		console.log(isSMSAvailable)
		if (isSMSAvailable) {
		}
	}
	return (
		<View style={styles.container}>
			<FlatList
				data={list}
				contentContainerStyle={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'flex-start',
					maxWidth: '95%',
				}}
				renderItem={({ item }: any) => {
					return (
						<View key={item.id} style={styles.itemStyle}>
							<Text style={styles.itemTextStyle} key={item.id}>
								{item.firstName}
							</Text>
							<Text style={styles.itemTextStyle}>{item.lastName}</Text>
							<Text style={styles.phoneNumberStyle} onPress={() => sendSms()}>
								{Array.isArray(item.phoneNumbers) && item.phoneNumbers.length
									? item.phoneNumbers[0].number
									: ''}
							</Text>
						</View>
					)
				}}
			/>
			<View style={styles.button}>
				<CustomButton
					text={'Get contacts'}
					handlePress={() => {
						getContacts()
					}}
				/>
			</View>
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
		marginTop: 20,
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'space-around',
		width: '60%',
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
		width: '50%',
		marginVertical: 10,
	},
	contactsList: {
		color: 'blue',
		marginVertical: 10,
		fontSize: 20,
	},
	itemStyle: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		paddingVertical: 10,
	},
	itemTextStyle: {
		flexBasis: '30%',
		fontSize: 20,
	},
	phoneNumberStyle: {
		flexBasis: '40%',
	},
})
