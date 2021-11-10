import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RouteNavigationProps } from '../App'
import CustomButton from '../components/CustomButton'

export default function Home({ navigation }: RouteNavigationProps<'Home'>) {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Hello world is what is usually here!!</Text>
			<View style={styles.buttonContainer}>
				<View style={styles.button}>
					<CustomButton
						text={'Calculator'}
						handlePress={() => navigation.navigate('Calculator')}
					/>
				</View>
				<View style={styles.button}>
					<CustomButton
						text={'Recipe finder'}
						handlePress={() => navigation.navigate('RecipeFinder')}
					/>
				</View>
				<View style={styles.button}>
					<CustomButton
						text={'Euro converter'}
						handlePress={() => navigation.navigate('EuroConverter')}
					/>
				</View>
				<View style={styles.button}>
					<CustomButton
						text={'Maps'}
						handlePress={() =>
							navigation.navigate('GoogleMapView', { restaurants: false })
						}
					/>
				</View>
				<View style={styles.button}>
					<CustomButton
						text={'Restaurant search'}
						handlePress={() =>
							navigation.navigate('GoogleMapView', { restaurants: true })
						}
					/>
				</View>
				<View style={styles.button}>
					<CustomButton
						text={'Shopping list'}
						handlePress={() => navigation.navigate('ShoppingList')}
					/>
				</View>
			</View>
			<StatusBar style='auto' />
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
	header: {
		fontSize: 20,
		marginBottom: '5%',
	},
	buttonContainer: {
		alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: '5%',
	},
	button: {
		marginVertical: 10,
		color: 'black',
		backgroundColor: 'blue',
		minWidth: '60%',
		borderRadius: 4,
	},
	appContainer: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
