import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'

import History from './components/History'
import Calculator from './components/Calculator'
import Home from './Screens/Home'
import RecipeFinder from './Screens/RecipeFinder'
import EuroConverter from './Screens/EuroConverter'
import GoogleMapView from './Screens/GoogleMapView'
import { createShoppingList } from './services/db'
import ShoppingList from './components/ShoppinList'
import ShoppingListFirebase from './components/ShoppingListFirebase'
import ContactList from './Screens/Contacts'
import TextToSpeech from './components/TextToSpeech'

type RootStackParamList = {
	Home: undefined
	Calculator: undefined
	CalculatorWithHistory: undefined
	ShoppingList: undefined
	ShoppingListFirebase: undefined
	Contacts: undefined
	TextToSpeech: undefined
	History: { numberList: string[] }
	RecipeFinder: undefined
	EuroConverter: undefined
	GoogleMapView: { restaurants: boolean }
}

export type RouteNavigationProps<T extends keyof RootStackParamList> =
	StackScreenProps<RootStackParamList, T>

export default function App() {
	// const Tab = createBottomTabNavigator()
	const Stack = createStackNavigator<RootStackParamList>()

	useEffect(() => {
		try {
			createShoppingList()
		} catch (error) {
			alert('error')
		}
	}, [])

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='Calculator' component={Calculator} />
				<Stack.Screen name='History' component={History} />
				<Stack.Screen name='RecipeFinder' component={RecipeFinder} />
				<Stack.Screen name='EuroConverter' component={EuroConverter} />
				<Stack.Screen name='GoogleMapView' component={GoogleMapView} />
				<Stack.Screen name='ShoppingList' component={ShoppingList} />
				<Stack.Screen
					name='ShoppingListFirebase'
					component={ShoppingListFirebase}
				/>
				<Stack.Screen name='Contacts' component={ContactList} />
				<Stack.Screen name='TextToSpeech' component={TextToSpeech} />
			</Stack.Navigator>
			{/* 
			If we want to use Tab navigator later on
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName = 'notifications'

						if (route.name === 'Home') {
							iconName = 'md-home'
						} else if (route.name === 'Calculator') {
							iconName = 'calculator'
						}

						return <Ionicons name={iconName} size={size} color={color} />
					},
					tabBarActiveTintColor: 'blue',
					tabBarInactiveTintColor: 'gray',
				})}
			>
				<Tab.Screen name='Home' component={Home} />
				<Tab.Screen name='Calculator' component={Calculator} />
			</Tab.Navigator> */}
		</NavigationContainer>
	)
}
