import React, { useEffect, useState } from 'react'
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
import { createTheme, ThemeProvider } from '@mui/material/styles'

const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#fff',
		},
	},
})

const EditSpecifications = () => {
	const [illness, setIllness] = React.useState('')
	const [age, setAge] = React.useState('')
	const [height, setHeight] = React.useState('')
	const [weight, setWeight] = React.useState('')
	const [bloodType, setBloodType] = React.useState('')
	const [disability, setDisability] = React.useState('')
	const [allergy, setAllergy] = React.useState('')
	const [injury, setInijury] = React.useState('')
	const [symptoms, setSymptoms] = React.useState('')
	const [sex, setSex] = React.useState('')
	const [photo, setPhoto] = useState(null)

	let navigate = useNavigate()

	const { updatePerson, getPerson, person, deletePerson } = usePerson()

	useEffect(() => {
		setTimeout(() => {
			getPerson()
		}, 1500)
	}, [])

	useEffect(() => {
		if (person) {
			setIllness(person.illness)
			setAge(person.age)
			setHeight(person.height)
			setWeight(person.weight)
			setBloodType(person.blood_type)
			setDisability(person.disability)
			setAllergy(person.allergy)
			setInijury(person.injury)
			setSymptoms(person.symptoms)
			setSex(person.sex)
			setPhoto(person.person_images)
		}
	}, [person])

	function handleSave() {
		// if (
		// 	!illness.trim() ||
		// 	!age.trim() ||
		// 	!height.trim() ||
		// 	!weight.trim() ||
		// 	!allergy.trim() ||
		// 	!illness.trim() ||
		// 	!injury.trim()
		// ) {
		// 	alert('Some inputs are empty')
		// 	return
		// }

		try {
			let newObj = {
				...person,
				age,
				height,
				weight,
				allergy,
				illness,
				bloodType,
				disability,
				injury,
				symptoms,
				sex,
				photo,
			}

			updatePerson(person.id, newObj)
			alert('Обновлено')
			navigate('/')

			setIllness('')
			setAge('')
			setHeight('')
			setWeight('')
			setBloodType('')
			setDisability('')
			setAllergy('')
			setInijury('')
			setSymptoms('')
		} catch (error) {
			console.log(error)
		}
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
									<MenuItem className='menu-item' value={false}>
										Нет
									</MenuItem>
									<MenuItem className='menu-item' value={true}>
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
								onChange={e => setInijury(e.target.value)}
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
						<ThemeProvider theme={lightTheme}>
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
										value='male'
										control={<Radio color='info' />}
										label='Male'
									/>
									<FormControlLabel
										value='female'
										control={<Radio color='info' />}
										label='Female'
									/>
									<FormControlLabel
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
						<button
							onClick={() => {
								deletePerson(person.id)
							}}
							className='create-btn'
						>
							Delete
						</button>
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

export default EditSpecifications
