import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('shoppingList.db')

export type ShoppingListItem = {
	id: number
	product: string
	amount: string
}

export type ShoppingListItemSaveType = Pick<
	ShoppingListItem,
	'amount' | 'product'
>

export type ShoppingListType = {
	items: ShoppingListItem[]
}
const logError = (error: any) => console.log(error)
// Create shopping list table
export const createShoppingList = () => {
	db.transaction((tx) => {
		tx.executeSql(
			'create table if not exists shopping_list (id integer primary key not null, product text, amount text);'
		)
	})
}

// Update shopping list
export const updateList = (setList: (setList: any) => void) => {
	db.transaction((tx) => {
		tx.executeSql('select * from shopping_list;', [], (_, { rows }) =>
			setList(rows._array)
		)
	}, logError)
}

// Save shoppinglist item
export const saveItem = ({ product, amount }: ShoppingListItemSaveType) => {
	db.transaction(
		(tx) => {
			tx.executeSql(
				'insert into shopping_list (product, amount) values (?, ?);',
				[product, amount]
			)
		},
		logError,
		undefined
	)
}

// Delete shopping list item
export const deleteItem = (id: number) => {
	db.transaction(
		(tx) => {
			tx.executeSql(`delete from shopping_list where id = ?;`, [id])
		},
		logError,
		undefined
	)
}
