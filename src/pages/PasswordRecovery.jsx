import React, { useState } from 'react'
import { useAuth } from '../contexts/authContext'
import '../styles/PasswordRecovery.css'

const PasswordRecovery = () => {
	const { passwordRecovery, verificationCode } = useAuth()

	const [disabled, setDisabled] = useState(false)
	const [loading, setLoading] = useState(false)

	const [email, setEmail] = useState('')

	const [code, setCode] = useState('')
	const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')

	function sendCode() {
		if (!email.trim()) {
			alert('Some inputs are empty')
			return
		}
		setLoading(true)
		setTimeout(() => {
			setDisabled(true)
		}, 2000)
		passwordRecovery(email)
	}

	function handleRecovery() {
		if (!code.trim() || !password.trim() || !password2.trim()) {
			alert('Some inputs are empty')
			return
		}

		verificationCode(code, password, password2)
	}

	return (
		<>
			<div className='recovery-block'>
				<div className='recovery-form'>
					<div className='inputs-block'>
						<div className='send-block'>
							<input
								disabled={disabled ? true : false}
								readOnly={disabled ? true : false}
								value={email}
								onChange={e => setEmail(e.target.value)}
								className='send-input'
								type='text'
								placeholder='Email'
							/>
							<button disabled={disabled ? true : false} onClick={sendCode}>
								Send
							</button>
						</div>
					</div>
				</div>
			</div>
			{disabled ? (
				<div className='recovery-block2'>
					<div className='recovery-form2'>
						<div className='inputs-block2'>
							<div className='send-block2'>
								<input
									// disabled={disabled ? null : true}
									type='text'
									value={code}
									onChange={e => setCode(e.target.value)}
									placeholder='Actived code'
									className='rec_code-inp'
								/>
								<input
									// disabled={disabled ? null : true}
									value={password}
									onChange={e => setPassword(e.target.value)}
									type='text'
									placeholder='Password'
									className='rec_password-inp'
								/>
								<input
									// disabled={disabled ? null : true}
									value={password2}
									onChange={e => setPassword2(e.target.value)}
									type='text'
									placeholder='Password Confirmation'
									className='rec_password2-inp'
								/>
								<button onClick={handleRecovery}>Recovery</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div
					className='loader'
					style={loading ? { display: 'block' } : { display: 'none' }}
				>
					<i className='layer'></i>
					<i className='layer'></i>
					<i className='layer'></i>
				</div>
			)}
		</>
	)
}

export default PasswordRecovery
