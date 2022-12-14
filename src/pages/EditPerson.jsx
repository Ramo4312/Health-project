import React, { useRef, useState, useEffect } from 'react'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import '../styles/CRUD.css'
import { usePerson } from '../contexts/peopleDataContext'
import { Navigate, useNavigate } from 'react-router-dom'
import '../styles/adaptive/CRUD-adaptive.css'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Avatar } from '@mui/material'
import { useAuth } from '../contexts/authContext'

const EditPerson = () => {
	const [name, setName] = React.useState('')
	const [surname, setSurname] = React.useState('')
	const [person_images, setPhoto] = React.useState('')
	const [sex, setSex] = React.useState('')
	const [age, setAge] = React.useState('')
	const [height, setHeight] = React.useState('')
	const [weight, setWeight] = React.useState('')
	const [bloodType, setBloodType] = React.useState('')
	const [disability, setDisability] = React.useState('')
	const [allergy, setAllergy] = React.useState('')
	const [injury, setInjury] = React.useState('')
	const [illness, setIllness] = React.useState('')
	const [symptoms, setSymptoms] = React.useState('')

	const { user, checkAuthorization } = useAuth()
	const { updatePerson, getPerson, person, deletePerson } = usePerson()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuthorization()
		}
	}, [])

	useEffect(() => {
		setTimeout(() => {
			getPerson()
		}, 1500)
	}, [])

	const inputFile = useRef()

	useEffect(() => {
		if (person) {
			setIllness(person.illness)
			setAge(person.age)
			setHeight(person.height)
			setWeight(person.weight)
			setBloodType(person.blood_type)
			setDisability(person.disability)
			setAllergy(person.allergy)
			setInjury(person.injury)
			setSymptoms(person.symptoms)
			setSex(person.sex)
			setPhoto(person.person_images)
			setName(person.name)
			setSurname(person.surname)
		}
	}, [person])

	const onBtnClick = () => {
		inputFile.current.click()
	}

	function handleSave() {
		// if (
		// 	!name.trim() ||
		// 	!surname.trim() ||
		// 	!illness.trim() ||
		// 	!age.trim() ||
		// 	!height.trim() ||
		// 	!weight.trim() ||
		// 	!allergy.trim() ||
		// 	!symptoms.trim() ||
		// 	!injury.trim() ||
		// 	!sex.trim()
		// ) {
		// 	alert('Some inputs are empty')
		// 	return
		// }

		let newObj = {
			...person,
			name,
			surname,
			person_images,
			sex,
			age,
			height,
			weight,
			bloodType,
			disability,
			allergy,
			illness,
			injury,
			symptoms,
		}

		updatePerson(person.id, newObj)

		setIllness('')
		setAge('')
		setHeight('')
		setWeight('')
		setBloodType('')
		setDisability('')
		setAllergy('')
		setInjury('')
		setSymptoms('')
		setName('')
		setSurname('')
		setPhoto('')
	}

	return (
		<>
			{person ? (
				<div
					className='crud-block'
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div className='crud-inputs-block4'>
						<div className='input-form2'>
							<div className='avatar'>
								<Avatar
									style={{ width: '60px', height: '60px', cursor: 'pointer' }}
									// value={photo_images}
									// className=''
									// src={photo}
									alt={
										user[0] == '"' ? user[1].toUpperCase() : user.toUpperCase()
									}
									type='file'
									onClick={onBtnClick}
								/>
								<h5
									style={{
										cursor: 'pointer',
										color: 'blue',
										textAlign: 'center',
									}}
									onClick={onBtnClick}
								>
									Добавить Фото
								</h5>
								<input
									ref={inputFile}
									type='file'
									placeholder='er'
									onChange={e => setPhoto(e.target.files)}
									style={{
										color: 'transparent',
										border: 'none',
										outline: '0',
										background: 'transparent ',
										display: 'none',
									}}
								/>
							</div>
							<div className='input-block2__right'>
								<input
									value={name}
									onChange={e => setName(e.target.value)}
									type='text'
									className='crud-inputs inputs-width'
									placeholder='Имя'
								/>
								<input
									value={surname}
									onChange={e => setSurname(e.target.value)}
									type='text'
									className='crud-inputs inputs-width'
									placeholder='Фамилия'
								/>
							</div>
						</div>
						<div className='crud-inputs-block4-select'>
							<FormControl
								className='crud-inputs__inner-select'
								color='warning'
								variant='standard'
							>
								<InputLabel id='demo-simple-select-standard-label'>
									Группа крови
								</InputLabel>
								<Select
									labelId='demo-simple-select-standard-label'
									id='demo-simple-select-standard'
									value={bloodType}
									onChange={e => setBloodType(e.target.value)}
									label='Age'
								>
									<MenuItem className='menu-item' value=''>
										<em>None</em>
									</MenuItem>
									<MenuItem className='menu-item' value={1}>
										I
									</MenuItem>
									<MenuItem className='menu-item' value={2}>
										II
									</MenuItem>
									<MenuItem className='menu-item' value={3}>
										III
									</MenuItem>
									<MenuItem className='menu-item' value={4}>
										IV
									</MenuItem>
								</Select>
							</FormControl>
							<FormControl
								color='warning'
								variant='standard'
								className='crud-inputs__inner-select'
							>
								<InputLabel id='demo-simple-select-standard-label'>
									Инвалидность
								</InputLabel>
								<Select
									labelId='demo-simple-select-standard-label'
									id='demo-simple-select-standard'
									value={disability}
									onChange={e => setDisability(e.target.value)}
									label='Age'
								>
									<MenuItem className='menu-item' value=''>
										<em>None</em>
									</MenuItem>
									<MenuItem className='menu-item' value='no'>
										Нет
									</MenuItem>
									<MenuItem className='menu-item' value='yes'>
										Да
									</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div className='crud-input-block1'>
							<input
								value={age}
								onChange={e => setAge(e.target.value)}
								type='number'
								placeholder='Возраст'
								className='crud-inputs-mini'
							/>
							<input
								value={height}
								onChange={e => setHeight(e.target.value)}
								type='number'
								placeholder='Рост'
								className='crud-inputs-mini'
							/>
							<input
								value={weight}
								onChange={e => setWeight(e.target.value)}
								type='number'
								placeholder='Вес'
								className='crud-inputs-mini'
							/>
						</div>
						<div className='input-block2'>
							<input
								value={illness}
								onChange={e => setIllness(e.target.value)}
								type='text'
								className='crud-inputs'
								placeholder='Болезнь'
							/>
							<input
								value={allergy}
								onChange={e => setAllergy(e.target.value)}
								type='text'
								className='crud-inputs'
								placeholder='Алергии'
							/>
							<input
								value={injury}
								onChange={e => setInjury(e.target.value)}
								type='text'
								className='crud-inputs'
								placeholder='Травмы'
							/>
							<input
								value={symptoms}
								onChange={e => setSymptoms(e.target.value)}
								type='text'
								className='crud-inputs'
								placeholder='Симптомы...'
							/>
						</div>
						<div
							style={{
								textAlign: 'center',
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<FormControl className='gender-select' style={{ width: '100%' }}>
								<RadioGroup
									className='radio-group'
									row
									aria-labelledby='demo-row-radio-buttons-group-label'
									name='row-radio-buttons-group'
									value={sex}
									onChange={e => setSex(e.target.value)}
								>
									<FormControlLabel
										className='radio-crud'
										value='male'
										control={<Radio style={{ color: 'black' }} />}
										label='Male'
									/>
									<FormControlLabel
										className='radio-crud'
										value='female'
										control={<Radio style={{ color: 'black' }} />}
										label='Female'
									/>
									<FormControlLabel
										className='radio-crud'
										value='pokemon'
										control={<Radio style={{ color: 'black' }} />}
										label='Packemon'
									/>
								</RadioGroup>
							</FormControl>
						</div>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-around',
							}}
						>
							<button
								className='editdelete-btn'
								onClick={() => {
									handleSave()
								}}
							>
								Update
							</button>
							<button
								className='delete-btn'
								onClick={() => {
									deletePerson(person.id)
								}}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className='loader'>
					<i className='layer'></i>
					<i className='layer'></i>
					<i className='layer'></i>
				</div>
			)}
		</>
	)
}

export default EditPerson
