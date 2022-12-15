import React, { useState } from 'react'
import '../styles/RegistrationPage.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/authContext'

const lightTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#fff',
		},
	},
})

const RegistrationPage = () => {
	const { registration } = useAuth()

	let navigate = useNavigate()

	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')
	const [username, setNickname] = useState('')

	function registerSystem() {
		if (
			// !username.trim() ||
			// !surname.trim() ||
			!username.trim() ||
			!email.trim() ||
			!password.trim() ||
			!password2.trim()
		) {
			alert('Some inputs are empty')
			return
		}
		registration(username, email, password, password2)
		navigate('/login')
	}

	// console.log(surname)
	return (
		<div className='register-form-page'>
			<div className='register-form'>

				<h3>Регистрация</h3>

				<div className='input-desc'>Имя</div>
				<input
					value={username}
					onChange={(e) => setNickname(e.target.value)}
					type='text'
					className='nickname-inp'
				/>

				<div className='input-desc'>Email</div>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type='text'
					className='reg_email-inp'
				/>

				<div className='age-gender-block'>
					<span>Возраст</span>
					<input className='age-input' />
					<select className='gender-select'>
						<div>5</div>
						<span>7</span>
					</select>
				</div>

				<div className='input-desc'>Пароль</div>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type='text'
					className='reg_password-inp'
				/>

				<div className='input-desc'>Повторите пароль</div>
				<input
					value={password2}
					onChange={(e) => setPassword2(e.target.value)}
					type='text'
					className='passwordConf-input'
				/>

				<button className='register-btn' onClick={registerSystem}>
					Регистрация
				</button>

				<button className='register-btn-log-in' onClick={registerSystem}>
					Вход
				</button>

			</div>
		</div>
	)
}

export default RegistrationPage
