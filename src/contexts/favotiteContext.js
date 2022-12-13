import React, { createContext, useContext, useReducer } from 'react'

const favContext = createContext()
export const useFav = () => useContext(favContext)

const INIT_STATE = {
	favorites: JSON.parse(localStorage.getItem('favorites')),
}

function reducer(state = INIT_STATE, action) {
	switch (action.type) {
		case 'GET_FAVORITES':
			return { ...state, favorites: action.payload }
		default:
			return state
	}
}

const FavoriteContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INIT_STATE)

	const getFavorite = () => {
		let favorites = JSON.parse(localStorage.getItem('favorites'))

		if (!favorites) {
			localStorage.setItem(
				'favorites',
				JSON.stringify({
					products: [],
				})
			)
			favorites = {
				products: [],
			}
		}

		dispatch({
			type: 'GET_FAVORITES',
			payload: favorites,
		})
	}

	const addProductToFavorite = product => {
		let favorites = JSON.parse(localStorage.getItem('favorites'))

		if (!favorites) {
			favorites = {
				products: [],
			}
		}

		let newProduct = {
			item: product,
		}

		let postToFind = favorites.products.filter(
			elem => elem.item.id === product.id
		)

		if (postToFind.length === 0) {
			favorites.products.push(newProduct)
		} else {
			favorites.product = favorites.products.filter(
				elem => elem.item.id !== product.id
			)
		}

		localStorage.setItem('favorites', JSON.stringify(favorites))

		dispatch({
			type: 'GET_FAVORITES',
			payload: favorites,
		})
	}

	function deleteProductInFavorite(id) {
		let favorites = JSON.parse(localStorage.getItem('favorites'))

		favorites.products = favorites.products.filter(elem => elem.item.id !== id)

		localStorage.setItem('favorites', JSON.stringify(favorites))

		getFavorite()

		dispatch({
			type: 'GET_BASKET_LENGTH',
			payload: favorites,
		})
	}

	const values = {
		favorites: state.favorites,

		getFavorite,
		addProductToFavorite,
		deleteProductInFavorite,
	}
	return <favContext.Provider value={values}>{children}</favContext.Provider>
}

export default FavoriteContextProvider
