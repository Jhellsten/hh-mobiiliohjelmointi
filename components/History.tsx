import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RouteNavigationProps } from '../App'

export default function History({ route }: RouteNavigationProps<'History'>) {
	const { numberList } = route.params
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{'History'}</Text>
			<View>
				{numberList.map((result, i) => {
					return <Text key={i}>{result}</Text>
				})}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		color: 'blue',
		marginVertical: 30,
	},
})
