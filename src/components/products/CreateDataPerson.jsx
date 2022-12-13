import React, { useRef } from 'react'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import '../../styles/CRUD.css'
import { usePerson } from '../../contexts/peopleDataContext'
import { Navigate, useNavigate } from 'react-router-dom'
import '../../styles/adaptive/CRUD-adaptive.css'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useEffect } from 'react'
import { Avatar } from '@mui/material'
import { useAuth } from '../../contexts/authContext'

const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#fff',
		},
	},
})

const CreateDataPerson = () => {
	const { user, checkAuthorization } = useAuth()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuthorization()
		}
	}, [])

	const inputFile = useRef()

	const onBtnClick = () => {
		inputFile.current.click()
	}

	const [name, setName] = React.useState('')
	const [surname, setSurname] = React.useState('')
	const [person_images, setPhoto] = React.useState('')
	const [age, setAge] = React.useState('')
	const [height, setHeight] = React.useState('')
	const [weight, setWeight] = React.useState('')
	const [bloodType, setBloodType] = React.useState('')
	const [disability, setDisability] = React.useState('')
	const [allergy, setAllergy] = React.useState('')
	const [injury, setInjury] = React.useState('')
	const [illness, setIllness] = React.useState('')
	const [symptoms, setSymptoms] = React.useState('')
	const [sex, setSex] = React.useState()

	// console.log(photo)

	let navigate = useNavigate()

	const { addPerson, getPerson } = usePerson()

	// useEffect(() => {
	// 	getPerson()
	// }, [])

	function handleSave() {
		console.log(person_images)
		if (
			!name.trim() ||
			!surname.trim() ||
			!sex.trim() ||
			!age.trim() ||
			!height.trim() ||
			!weight.trim() ||
			!allergy.trim() ||
			!injury.trim() ||
			!illness.trim() ||
			!symptoms.trim()
		) {
			alert('Some inputs are empty')
			return
		}

		addPerson(
			name,
			surname,
			person_images,
			age,
			height,
			weight,
			bloodType,
			disability,
			allergy,
			injury,
			illness,
			symptoms
		)

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
							value={person_images}
							className='avatar-image'
							// src={person_images}
							alt={user[0] == '"' ? user[1].toUpperCase() : user.toUpperCase()}
						/>
						<div className='avatar-text' onClick={onBtnClick}>
							Добавить Фото
						</div>
						<input
							ref={inputFile}
							type='file'
							placeholder='er'
							accept='image/*'
							onChange={(e) => setPhoto(e.target.files[0])}
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
							onChange={(e) => setName(e.target.value)}
							type='text'
							className='crud-inputs inputs-width'
							placeholder='Имя'
						/>
						<input
							value={surname}
							onChange={(e) => setSurname(e.target.value)}
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
							onChange={(e) => setBloodType(e.target.value)}
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
							onChange={(e) => setDisability(e.target.value)}
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
						onChange={(e) => setAge(e.target.value)}
						type='number'
						placeholder='Возраст'
						className='crud-inputs-mini'
					/>
					<input
						value={height}
						onChange={(e) => setHeight(e.target.value)}
						type='number'
						placeholder='Рост'
						className='crud-inputs-mini'
					/>
					<input
						value={weight}
						onChange={(e) => setWeight(e.target.value)}
						type='number'
						placeholder='Вес'
						className='crud-inputs-mini'
					/>
				</div>
				<div className='input-block2'>
					<input
						value={illness}
						onChange={(e) => setIllness(e.target.value)}
						type='text'
						className='crud-inputs'
						placeholder='Болезнь'
					/>
					<input
						value={allergy}
						onChange={(e) => setAllergy(e.target.value)}
						type='text'
						className='crud-inputs'
						placeholder='Алергии'
					/>
					<input
						value={injury}
						onChange={(e) => setInjury(e.target.value)}
						type='text'
						className='crud-inputs'
						placeholder='Травмы'
					/>
					<input
						value={symptoms}
						onChange={(e) => setSymptoms(e.target.value)}
						type='text'
						className='crud-inputs'
						placeholder='Симптомы...'
					/>
				</div>
				<ThemeProvider theme={lightTheme}>
					<FormControl className='gender-select' style={{ width: '100%' }}>
						<RadioGroup
							className='radio-group'
							row
							aria-labelledby='demo-row-radio-buttons-group-label'
							name='row-radio-buttons-group'
							value={sex}
							onChange={(e) => setSex(e.target.value)}
						>
							<FormControlLabel
								className='radio-crud'
								value='male'
								control={<Radio color='info' />}
								label='Male'
							/>
							<FormControlLabel
								className='radio-crud'
								value='female'
								control={<Radio color='info' />}
								label='Female'
							/>
							<FormControlLabel
								className='radio-crud'
								value='pokemon'
								control={<Radio />}
								label='Packemon'
							/>
						</RadioGroup>
					</FormControl>
				</ThemeProvider>
				<button
					className='create-btn'
					onClick={() => {
						handleSave()
					}}
				>
					Save
				</button>
			</div>
		</div>
	)
}

export default CreateDataPerson
