import React, { createContext, useContext, useReducer } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

export const productContext = createContext()
export const useProduct = () => useContext(productContext)

let API_PRODUCTS = 'http://localhost:8000/products'
// const API_PRODUCTS = 'http://34.133.205.247/'

const INIT_STATE = {
	allCategories: [],
	products: [],
}

const reducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case 'GET_PRODUCTS':
			return { ...state, products: action.payload }
		case 'GET_CATEGORIES':
			return { ...state, allCategories: action.payload }
		default:
			return state
	}
}

const ProductContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INIT_STATE)

	let navigate = useNavigate()
	const location = useLocation()

	// add Post

	// async function addPost(newPost) {
	// 	await axios.post(API_PRODUCTS, newPost)

	// 	getProducts()
	// }

	async function getProducts() {
		// const res2 = await axios(`${API_PRODUCTS}shop/${window.location.search}`)
		// console.log(res2)

		const res = await axios(`${API_PRODUCTS}/${window.location.search}`)
		console.log(res)
		dispatch({
			type: 'GET_PRODUCTS',
			payload: res.data,
		})
	}

	async function getCategories() {
		// const res = await axios(`${API_PRODUCTS}shop/`)
		const res = await axios(`${API_PRODUCTS}`)

		console.log(res)

		dispatch({
			type: 'GET_CATEGORIES',
			payload: res.data,
		})
	}

	async function deletePost(id) {
		await axios.delete(`${API_PRODUCTS}/${id}`)

		getProducts()
	}

	async function saveChanges(newPost) {
		await axios.patch(`${API_PRODUCTS}/${newPost.id}`, newPost)
		getProducts()
	}

	const fetchByParams = (query, value) => {
		const search = new URLSearchParams(location.search)

		if (value === 'all') {
			search.delete(query)
		} else {
			search.set(query, value)
		}

		const url = `${location.pathname}?${search.toString()}`

		console.log(url)

		navigate(url)
	}

	// values

	const values = {
		// addPost,
		getProducts,
		fetchByParams,
		getCategories,
		saveChanges,
		deletePost,

		products: state.products,
		allCategories: state.allCategories,
	}

	return (
		<productContext.Provider value={values}>{children}</productContext.Provider>
	)
}

export default ProductContextProvider
