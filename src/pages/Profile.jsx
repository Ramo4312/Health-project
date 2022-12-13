import React, { useState, useEffect, useRef } from 'react'
import '../styles/EditPerson.css'
import Avatar from '@mui/material/Avatar'
import { useAuth } from '../contexts/authContext'
import { useScrollTrigger } from '@mui/material'

const EditPerson = () => {
	const { user, checkAuthorization } = useAuth()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuthorization()
		}
	}, [])

	const inputFile = useRef()

	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [password2, setPassword2] = useState('')
	const [username, setUsername] = useState('')
	const [photo, setPhoto] = useState('')

	const onBtnClick = () => {
		inputFile.current.click()
	}

	return (
		<div className='editPerson-parent-block'>
			<div className='editPerson-block'>
				<ul className='editPerson-list'>
					<div className='avatar'>
						<Avatar
							style={{ width: '60px', height: '60px' }}
							value={photo}
							className=''
							src={photo}
							alt={user[0] == '"' ? user[1].toUpperCase() : user.toUpperCase()}
							type='file'
						/>
						<h5
							style={{ cursor: 'pointer', color: 'blue' }}
							onClick={onBtnClick}
						>
							Изменить Фото
						</h5>
						<input
							ref={inputFile}
							type='file'
							placeholder='er'
							onChange={e => setPhoto(e.target.value)}
							style={{
								color: 'transparent',
								border: 'none',
								outline: '0',
								background: 'transparent ',
								display: 'none',
							}}
						/>
					</div>

					<li className='name-li'>Имя</li>
					<li className='surname-li'>Фамилия</li>
					<li className='email-li'>Електронная почта</li>
					<li className='username-li'>Имя пользователя</li>
					<li className='password-li'>Старый Пороль</li>
					<li className='password-li'>Новый Пороль</li>
					<li className='passwordConfirm-li'>Подтверждение нового пороля</li>
				</ul>

				<div className='editPerson-form'>
					Личная информация Укажите личную информацию, даже если аккаунт
					используется для компании, домашнего животного или в других целях.
					<div className='editInput-block'>
						<input
							type='text'
							placeholder=''
							className='editPerson-inputs editPerson-name-input'
							value={name}
							onChange={e => setName(e.target.value)}
						/>
						<input
							type='text'
							placeholder=''
							className='editPerson-inputs'
							value={surname}
							onChange={e => setSurname(e.target.value)}
						/>
						<p>
							Чтобы людям было проще находить ваш аккаунт, используйте имя, под
							которым вас знают: ваше имя и фамилию, никнейм или название
							компании.
						</p>
						<input
							type='text'
							placeholder=''
							className='editPerson-inputs'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<input
							type='text'
							placeholder=''
							className='editPerson-inputs'
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
						<input
							type='text'
							placeholder=''
							className='editPerson-inputs'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<input
							type='text'
							placeholder=''
							className='editPerson-inputs'
							value={newPassword}
							onChange={e => setPassword(e.target.value)}
						/>
						<input
							type='text'
							placeholder=''
							className='editPerson-inputs'
							value={password2}
							onChange={e => setPassword2(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<button className='change-btn'>Изменить</button>
		</div>
	)
}

export default EditPerson
