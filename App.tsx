import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'

import History from './components/History'
import Calculator from './components/Calculator'
import Home from './Screens/Home'
import RecipeFinder from './Screens/RecipeFinder'

type RootStackParamList = {
	Home: undefined
	Calculator: undefined
	CalculatorWithHistory: undefined
	ShoppingList: undefined
	History: { numberList: string[] }
	RecipeFinder: undefined
}

export type RouteNavigationProps<T extends keyof RootStackParamList> =
	StackScreenProps<RootStackParamList, T>

export default function App() {
	// const Tab = createBottomTabNavigator()
	const Stack = createStackNavigator<RootStackParamList>()

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='Calculator' component={Calculator} />
				<Stack.Screen name='History' component={History} />
				<Stack.Screen name='RecipeFinder' component={RecipeFinder} />
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
