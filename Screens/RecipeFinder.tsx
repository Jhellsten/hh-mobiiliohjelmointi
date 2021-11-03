import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { RouteNavigationProps } from '../App'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/Input'

type RecipeItemType = {
	idMeal: string
	strMeal: string
	strMealThumb: string
}

const RecipeFinder = () => {
	const [searchText, setSearchText] = useState<string>('')
	const [recipes, setRecipes] = useState([])

	const getRecipes = async (text: string) => {
		try {
			setRecipes([])
			const res = await fetch(
				`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`
			)
			const data = await res.json()
			if (data.meals) {
				setRecipes(data.meals)
			}
		} catch (error) {
			alert(error)
		}
	}

	const RecipeItem = ({ idMeal, strMeal, strMealThumb }: RecipeItemType) => {
		return (
			<View style={styles.recipeItem} key={idMeal}>
				<Text>{strMeal}</Text>
				<View>
					<Image
						source={{ uri: strMealThumb }}
						style={{ width: 200, height: 200 }}
					/>
				</View>
			</View>
		)
	}

	const renderItem = ({ item }: { item: RecipeItemType }) => {
		return RecipeItem(item)
	}

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Text>{'Find your recipe'}</Text>
				<CustomInput value={searchText} handleChange={setSearchText} />
				<CustomButton
					text={'Find'}
					handlePress={() => getRecipes(searchText)}
				/>
				<View style={styles.recipeContainer}>
					<FlatList
						keyExtractor={(item, i) => i.toString()}
						data={recipes}
						renderItem={(item) => renderItem(item)}
					/>
				</View>
			</View>
		</View>
	)
}

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	inputContainer: {
		marginTop: 10,
	},
	recipeContainer: {
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		marginTop: 20,
	},
	recipeItem: {
		marginVertical: 20,
	},
})

export default RecipeFinder
