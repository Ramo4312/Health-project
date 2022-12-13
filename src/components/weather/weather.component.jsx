import React from 'react'
import '../../styles/weather.style.css'
import { motion } from 'framer-motion'

const Weather = ({
	cityname,
	weatherIcon,
	temp_celsius,
	temp_min,
	temp_max,
	description,
}) => {
	return (
		<div className='weather-container text-light'>
			<div className='Card'>
				<h1 className='text-white weather-h1 py-3'>{cityname}</h1>
				<h5 className=' iconClouds py-4'>
					<i id='cloudsIcons' className={`wi ${weatherIcon} display-1`} />
				</h5>

				{/* Get Celsius */}
				{temp_celsius ? (
					<h1 className='py-2 celcium'>{temp_celsius}&deg;</h1>
				) : null}

				{/* show max and min temp */}
				{maxminTemp(temp_min, temp_max)}

				{/* Weather description */}
				<h4 className='py-3 clouds'>
					{description.charAt(0).toUpperCase() + description.slice(1)}
				</h4>
			</div>
		</div>
	)
}

export default Weather

function maxminTemp(min, max) {
	if (max && min) {
		return (
			<>
				<h3>
					<span className=' min px-4'>Минимум: {min}&deg;</span>
					<br />
					<span className=' max px-4'>Максимум: {max}&deg;</span>
				</h3>
				<br />
			</>
		)
	}
}
