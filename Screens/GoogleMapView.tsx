import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native'
import MapView, { Marker, Region } from 'react-native-maps'
import CustomInput from '../components/Input'
import * as Location from 'expo-location'
import CustomButton from '../components/CustomButton'
import { RouteNavigationProps } from '../App'
import { googleMapsApiKey } from '../env'

type MarkerItem = {
	latitude: number
	longitude: number
	title: string
}

const GoogleMapView = ({ route }: RouteNavigationProps<'GoogleMapView'>) => {
	const { restaurants } = route.params
	const [userInput, setUserInput] = useState<string>('')
	const [location, setLocation] = useState<Region>({
		latitude: 60.200692,
		longitude: 24.934302,
		latitudeDelta: 0.0322,
		longitudeDelta: 0.0221,
	})

	const [markers, setMarkers] = useState<MarkerItem[]>([
		{ latitude: 60.201373, longitude: 24.934041, title: 'Haaga-Helia' },
	])

	const getMarkers = (markerItem: MarkerItem) => {
		const clonedMarkers = [...markers]
		const existingLocationMarkerIndex = clonedMarkers.findIndex(
			(marker) => marker.title === markerItem.title
		)
		if (existingLocationMarkerIndex !== -1) {
			clonedMarkers[existingLocationMarkerIndex] = markerItem
		} else {
			clonedMarkers.push(markerItem)
		}
		return clonedMarkers
	}

	const getRestaurants = async (text: string) => {
		try {
			const location = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?components=fi&address=${text}&radius=500&key=${googleMapsApiKey}`
			)
			const locationData = await location.json()
			if (locationData.results && locationData.results.length) {
				const [closest] = locationData.results
				const res = await fetch(
					`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${closest.geometry.location.lat},${closest.geometry.location.lng}&type=restaurant&radius=500&key=${googleMapsApiKey}`
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
					const markers = getMarkers({
						latitude: closest.geometry.location.lat,
						longitude: closest.geometry.location.lng,
						title: 'Selected location',
					})
					const restaurantMarkers = data.results.map((restaurant: any) => {
						return {
							latitude: restaurant.geometry.location.lat,
							longitude: restaurant.geometry.location.lng,
							title: restaurant.name,
						}
					})
					setMarkers([...markers, ...restaurantMarkers])
				}
			}
		} catch (error) {
			alert(error)
		}
	}

	const getLocations = async (text: string) => {
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
				const markers = getMarkers({
					latitude: closest.geometry.location.lat,
					longitude: closest.geometry.location.lng,
					title: 'Selected location',
				})
				setMarkers(markers)
			}
		} catch (error) {
			alert(error)
		}
	}

	useEffect(() => {
		;(async () => {
			try {
				let { status } = await Location.requestForegroundPermissionsAsync()
				if (status !== 'granted') {
					alert('Permission to access location was denied')
					return
				}

				let location = await Location.getCurrentPositionAsync({})
				const myLocationMarker: MarkerItem = {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					title: 'My location',
				}
				const clonedMarkers = getMarkers(myLocationMarker)
				setMarkers(clonedMarkers)
				setLocation({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.0322,
					longitudeDelta: 0.0221,
				})
			} catch (error) {
				console.error(error)
			}
		})()
	}, [])

	const handleGetLocation = async () => {
		if (userInput.length > 2) {
			if (restaurants) {
				await getRestaurants(userInput)
			} else {
				await getLocations(userInput)
			}
		}
	}

	const onRegionChange = (region: Region) => {
		setLocation(region)
	}

	return (
		<View style={styles.container}>
			<View>
				<MapView
					style={styles.map}
					region={location}
					onRegionChange={onRegionChange}
					showsMyLocationButton
					mapType={'terrain'}
				>
					{markers.map((marker: MarkerItem, index: number) => {
						return (
							<Marker
								key={index}
								coordinate={{
									latitude: marker.latitude,
									longitude: marker.longitude,
								}}
								title={marker.title}
							/>
						)
					})}
				</MapView>
			</View>

			<View style={styles.inputContainer}>
				<CustomInput
					value={userInput}
					handleChange={(text) => setUserInput(text)}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<CustomButton text={'Find location'} handlePress={handleGetLocation} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
	},
	buttonContainer: {
		marginBottom: 40,
	},
	map: {
		width: Dimensions.get('window').width,
		height:
			Dimensions.get('window').height - Dimensions.get('window').height / 4,
	},
})

export default GoogleMapView
