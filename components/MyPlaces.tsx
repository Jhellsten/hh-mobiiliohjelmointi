import React, { useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { initializeApp } from 'firebase/app'
import {
	addDoc,
	collection,
	doc,
	getDocs,
	getFirestore,
	onSnapshot,
	deleteDoc,
	query,
	where,
} from 'firebase/firestore'
import {
	apiKey,
	appId,
	authDomain,
	googleMapsApiKey,
	measurementId,
	messagingSenderId,
	projectId,
	storageBucket,
} from '../env'
import { Button, Input, ListItem } from 'react-native-elements'
import { ScreenWidth } from 'react-native-elements/dist/helpers'
import { MarkerItem } from '../Screens/GoogleMapView'
import { Region } from 'react-native-maps'
import { RouteNavigationProps } from '../App'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import CustomButton from './CustomButton'

export type MyPlacesMarker = MarkerItem & { id: string }

export default function MyPlaces({
	navigation,
}: RouteNavigationProps<'MyPlaces'>) {
	// InitializeFirebasewithyourown config parameters
	const firebaseConfig = {
		apiKey,
		authDomain,
		projectId,
		storageBucket,
		measurementId,
		messagingSenderId,
		appId,
	}

	const app = initializeApp(firebaseConfig)
	const database = getFirestore()
	const [address, setSetAddress] = useState<string>('')
	const [list, setList] = useState<MyPlacesMarker[]>([])
	const [location, setLocation] = useState<Region>({
		latitude: 60.200692,
		longitude: 24.934302,
		latitudeDelta: 0.0322,
		longitudeDelta: 0.0221,
	})

	const getFirebaseData = async () => {
		const querySnapshot = await getDocs(collection(database, 'my-places'))
		const items: MyPlacesMarker[] = []
		querySnapshot.forEach((doc) => {
			const { title, location } = doc.data()
			items.push({
				id: doc.id,
				title,
				latitude: location.lat,
				longitude: location.lng,
			})
		})
		setList(items)
	}

	useEffect(() => {
		try {
			const q = query(collection(database, 'my-places'))
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const items: MyPlacesMarker[] = []
				querySnapshot.forEach((doc) => {
					const { title, location } = doc.data()
					items.push({
						id: doc.id,
						title,
						latitude: location.lat,
						longitude: location.lng,
					})
				})
				setList(items)
			})
			;() => {
				unsubscribe()
			}
		} catch (error) {
			alert(error)
		}
	}, [])

	useEffect(() => {
		const getData = () => {
			try {
				getFirebaseData()
			} catch (error) {
				alert(error)
			}
		}
		getData()
	}, [])

	const saveLocation = async (text: string) => {
		try {
			const res = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${text}&radius=500&key=${googleMapsApiKey}`
			)
			const data = await res.json()
			if (data.results && data.results.length) {
				const [closest] = data.results
				setLocation({
					latitude: closest.geometry.location.lat,
					longitude: closest.geometry.location.lng,
					latitudeDelta: 0.0322,
					longitudeDelta: 0.0221,
				})
				saveItem({
					latitude: closest.geometry.location.lat,
					longitude: closest.geometry.location.lng,
					title: text,
				})
				setSetAddress('')
			}
		} catch (error) {
			alert(error)
		}
	}

	const saveItem = async ({ longitude, latitude, title }: MarkerItem) => {
		try {
			await addDoc(collection(database, 'my-places'), {
				location: { lat: latitude, lng: longitude },
				title,
			})
		} catch (error) {
			alert(error)
		}
	}

	const deleteItem = async (id: string) => {
		try {
			await deleteDoc(doc(database, 'my-places', id))
		} catch (error) {
			alert(error)
		}
	}

	const handleGetLocation = async () => {
		if (address.length > 2) {
			await saveLocation(address)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<View>
					<Text style={{ color: 'gray', marginBottom: 10, fontWeight: 'bold' }}>
						{'Place finder'.toUpperCase()}
					</Text>
					<Input
						// style={styles.input}
						placeholder={'Type in address'}
						onChangeText={(value) => setSetAddress(value)}
						value={address}
					/>
				</View>
			</View>
			<View style={styles.inputContainer}>
				<View style={styles.button}>
					<CustomButton
						icon={'save'}
						text={'Save'}
						handlePress={handleGetLocation}
					/>
				</View>
			</View>
			<Divider style={{ borderColor: 'gray' }} />
			<FlatList
				data={list}
				contentContainerStyle={{
					flex: 1,
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
				renderItem={({ item }: any) => {
					return (
						<ListItem
							style={{ width: ScreenWidth * 0.95, paddingVertical: 10 }}
							key={item.id}
							bottomDivider
							onLongPress={() => deleteItem(item.id)}
							onPress={() =>
								navigation.navigate('MyPlacesApp', {
									location: { lat: item.latitude, lng: item.longitude },
									title: item.title,
								})
							}
						>
							<ListItem.Content>
								<ListItem.Title>{item.title}</ListItem.Title>
							</ListItem.Content>
							<ListItem.Subtitle style={{ color: 'gray', marginRight: 5 }}>
								{'show on Map'}
								<ListItem.Chevron
									name='chevron-forward-outline'
									brand
									color={'gray'}
									size={20}
									style={{ marginLeft: 'auto' }}
								/>
							</ListItem.Subtitle>
						</ListItem>
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
		marginTop: 20,
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'space-around',
		width: '95%',
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
		width: '100%',
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
