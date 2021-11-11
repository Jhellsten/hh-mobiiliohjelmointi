import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/Input'

interface Props {}

type RatesRawItemType = {
	[key: string]: number
}
type RatesItemType = {
	key: string
	value: number
}

const EuroConverter = (props: Props) => {
	const [rates, setRates] = useState<RatesItemType[]>([])
	const [convertedValue, setConvertedValue] = useState<string>('0')
	const [userInput, setUserInput] = useState<string>('0')
	const [selectedRate, setSelectedRate] = useState<number>(0.848602)
	const apiKey = ''

	useEffect(() => {
		const getRates = async () => {
			await getExchangeRates()
		}
		if (!rates.length) {
			getRates()
		}
	}, [])

	const mapRates = (obj: Record<string, number>): RatesItemType[] => {
		return Object.keys(obj).map((key) => {
			return { key, value: obj[key] }
		})
	}

	const getExchangeRates = async () => {
		try {
			setRates([])
			const res = await fetch(
				`http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}&format=1`
			)
			const data = await res.json()
			if (data.success === true) {
				setRates(mapRates(data.rates))
			}
		} catch (error) {
			alert(error)
		}
	}

	return (
		<View style={styles.container}>
			<Text>Check how much this is in Euros!</Text>
			{convertedValue !== '0' && <Text>{`${convertedValue} €`}</Text>}
			<View style={styles.inputContainer}>
				<View>
					<CustomInput
						value={userInput}
						handleChange={(text) => setUserInput(text)}
						type={'decimal-pad'}
					/>
				</View>

				<Picker
					selectedValue={selectedRate}
					mode={'dialog'}
					itemStyle={{ height: 175 }}
					style={{
						width: 100,
						color: 'white',
						backgroundColor: 'white',
					}}
					numberOfLines={1}
					onValueChange={(itemValue) => {
						setSelectedRate(itemValue)
					}}
				>
					{rates.map((rate: RatesItemType) => {
						return <Picker.Item label={rate.key} value={rate.value} />
					})}
				</Picker>
			</View>

			<CustomButton
				text={'Convert'}
				handlePress={() =>
					setConvertedValue(String(parseFloat(userInput) / selectedRate))
				}
			/>
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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		maxWidth: 300,
	},
})

export default EuroConverter
