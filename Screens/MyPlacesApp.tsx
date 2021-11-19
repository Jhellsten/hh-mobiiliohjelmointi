import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native'
import MapView, { Marker, Region } from 'react-native-maps'
import CustomInput from '../components/Input'
import * as Location from 'expo-location'
import CustomButton from '../components/CustomButton'
import { RouteNavigationProps } from '../App'
import { googleMapsApiKey } from '../env'
import { Button } from 'react-native-elements'

type MarkerItem = {
	latitude: number
	longitude: number
	title: string
}

const MyPlacesApp = ({
	route,
	navigation,
}: RouteNavigationProps<'MyPlacesApp'>) => {
	const { location, title } = route.params
	const [loc, setLocation] = useState<Region>({
		latitude: 60.200692,
		longitude: 24.934302,
		latitudeDelta: 0.0322,
		longitudeDelta: 0.0221,
	})

	const onRegionChange = (region: Region) => {
		setLocation(region)
	}

	return (
		<View style={styles.container}>
			<View>
				<MapView
					style={styles.map}
					region={{
						latitude: location.lat,
						longitude: location.lng,
						latitudeDelta: 0.0322,
						longitudeDelta: 0.0221,
					}}
					onRegionChange={onRegionChange}
					showsMyLocationButton
					mapType={'terrain'}
				>
					<Marker
						coordinate={{
							latitude: location.lat,
							longitude: location.lng,
						}}
						title={title || 'no title'}
					/>
				</MapView>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					title={'Show'}
					onPress={() => navigation.navigate('MyPlaces')}
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
		justifyContent: 'center',
	},
	inputContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
	},
	buttonContainer: {
		width: '100%',
		marginBottom: 30,
	},
	map: {
		width: Dimensions.get('window').width,
		height:
			Dimensions.get('window').height - Dimensions.get('window').height / 4,
	},
})

export default MyPlacesApp
