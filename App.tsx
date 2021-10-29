import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Calculator from './components/Calculator'
import CalculatorWithHistory from './components/CalculatorWithHistory'
import CustomButton from './components/CustomButton'
import GuessingGame from './components/GuessingGame'
import ShoppingList from './components/ShoppinList'

export default function App() {
	const [selectedApp, setSelectedApp] = useState<number | null>(null)

	const renderSelectedApp = () => {
		switch (selectedApp) {
			case 0:
				return <Calculator />
			case 1:
				return <CalculatorWithHistory />
			case 2:
				return <GuessingGame />
			case 3:
				return <ShoppingList />
			default:
				return null
		}
	}

	const SelectableApps = [
		'Calculator',
		'Calculator with history',
		'Guessing game',
		'Shopping list',
	]

	const handleAppSelect = (index: number) => {
		if (selectedApp === index) {
			setSelectedApp(null)
		} else {
			setSelectedApp(index)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Hello world is what is usually here!!</Text>
			<View style={styles.buttonContainer}>
				{selectedApp === null ? (
					SelectableApps.map((app, i) => {
						return (
							<View style={styles.button} key={i}>
								<CustomButton
									text={app}
									handlePress={() => handleAppSelect(i)}
								/>
							</View>
						)
					})
				) : (
					<View style={styles.button}>
						<CustomButton
							text={'Close'}
							handlePress={() => handleAppSelect(selectedApp)}
						/>
					</View>
				)}
			</View>
			<View style={styles.appContainer}>{renderSelectedApp()}</View>
			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		marginTop: '50%',
	},
	header: {
		fontSize: 20,
		marginBottom: '5%',
	},
	buttonContainer: {
		alignItems: 'center',
		justifyContent: 'center',
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
