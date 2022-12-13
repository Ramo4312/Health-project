import React, { useContext, createContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const authContext = createContext()
export const useAuth = () => useContext(authContext)

const API = 'http://34.133.205.247/'

const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const config = {
		headers: { 'Content-Type': 'application/json' },
	}

	const registration = async (username, email, password, password2) => {
		let formData = new FormData()
		formData.append('username', username)
		formData.append('email', email)
		formData.append('password', password)
		formData.append('password2', password2)

		try {
			// const res = await axios.post(`http://localhost:8000/accounts`, formData)
			const res = await axios.post(`${API}accounts/register/`, formData)
			console.log(res.data)
		} catch (err) {
			setError('Error occured')
			console.log(err)
		}
	}

	const login = async (username, password) => {
		let formData = new FormData()
		formData.append('username', username)
		formData.append('password', password)

		try {
			// const res = await axios.post(`http://localhost:8000/accounts`, formData, config)
			const res = await axios.post(`${API}accounts/login/`, formData, config)

			localStorage.setItem('token', JSON.stringify(res.data))
			// navigate('/')

			localStorage.setItem('username', JSON.stringify(username))
			localStorage.setItem('password', JSON.stringify(password))
			setUser(username)
			setPassword(password)
		} catch (err) {
			setError('WRONG USERNAME OR PASSWORD', err)
		}
	}

	async function checkAuthorization() {
		let token = JSON.parse(localStorage.getItem('token'))

		try {
			const Authorization = `Bearer ${token.access}`

			let res = await axios.post(
				`${API}accounts/refresh/`,
				{ refresh: token.refresh },
				{ headers: { Authorization } }
			)
			localStorage.setItem(
				'token',
				JSON.stringify({ refresh: token.refresh, access: res.data.access })
			)

			let username = localStorage.getItem('username')
			setUser(username)
		} catch (err) {
			console.error(err)
			// logout()
		}
	}

	function logout() {
		localStorage.removeItem('token')
		localStorage.removeItem('username')
		setUser('')
		navigate('/')
	}

	async function passwordRecovery(email) {
		let formData = new FormData()
		formData.append('email', email)

		try {
			let res = await axios.post(`${API}accounts/forgot/`, formData)
			console.log(res)
		} catch (err) {
			console.log(err)
		}
	}

	async function verificationCode(code, password, password2) {
		let formData = new FormData()
		formData.append('code', code)
		formData.append('password', password)
		formData.append('password2', password2)

		try {
			let res = await axios.post(`${API}accounts/restore/`, formData, config)
			console.log(res)
			navigate('/login')
		} catch (err) {
			console.error(err)
		}
	}

	async function updateAuth() {
		await axios()
	}

	const values = {
		user,
		password,
		error,

		registration,
		login,
		logout,
		passwordRecovery,
		verificationCode,
		checkAuthorization,
	}

	return <authContext.Provider value={values}>{children}</authContext.Provider>
}

export default AuthContextProvider
