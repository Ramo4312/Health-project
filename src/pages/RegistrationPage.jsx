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
		<motion.div
			className='registration-page'
			initial={{ width: 0, opacity: 0 }}
			animate={{ width: '80vw', opacity: 1 }}
			exit={{ width: window.innerWidth, opacity: 0 }}
		>
			<div className='register-form-back'>
				<div className='register-group'>

					<h3>Sign Up</h3>

					<div className='input-desc'>Nickname:</div>
					<input
						value={username}
						onChange={(e) => setNickname(e.target.value)}
						type='text'
						placeholder='Nickname'
						className='nickname-inp'
					/>

					<div className='input-desc'>Email:</div>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type='text'
						placeholder='Email'
						className='reg_email-inp'
					/>

					<div className='input-desc'>Password</div>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type='text'
						placeholder='Password'
						className='reg_password-inp'
					/>

					<div className='input-desc'>Password confirmation</div>
					<input
						value={password2}
						onChange={(e) => setPassword2(e.target.value)}
						type='text'
						placeholder='Password Confirmation'
						className='passwordConf-input'
					/>

					<button className='register-btn' onClick={registerSystem}>
						Sign Up
					</button>

					<button className='register-btn-log-in' onClick={registerSystem}>
						Log in
					</button>

				</div>
			</div>
		</motion.div>
	)
}

export default RegistrationPage
