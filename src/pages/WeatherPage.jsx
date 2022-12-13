import React, { useState } from 'react'
import '../styles/Weather.css'
import Form from '../components/weather/form.component'
import Weather from '../components/weather/weather.component'
// import 'bootstrap/dist/css/bootstrap.min.css'

// git project https://github.com/erikflowers/weather-icons
import 'weather-icons/css/weather-icons.css'
import axios from 'axios'
import { motion } from 'framer-motion'

const Api_Key = '429736441cf3572838aa10530929f7cd'

const WeatherPage = () => {
	const [city, setCity] = useState(undefined)
	const [country, setCountry] = useState(undefined)
	const [icon, setIcon] = useState(undefined)
	const [main, setMain] = useState(undefined)
	const [celsius, setCelsius] = useState(undefined)
	const [temp_max, setTemp_max] = useState(null)
	const [temp_min, setTemp_min] = useState(null)
	const [description, setDescription] = useState('')
	const [error, setError] = useState(false)

	const weatherIcon = {
		Thunderstorm: 'wi-thunderstorm',
		Drizzle: 'wi-sleet',
		Rain: 'wi-storm-showers',
		Snow: 'wi-snow',
		Atmosphere: 'wi-fog',
		Clear: 'wi-day-sunny',
		Clouds: 'wi-day-fog',
	}

	function get_WeatherIcon(icons, rangeId) {
		switch (true) {
			case rangeId >= 200 && rangeId < 232:
				setIcon(icons.Thunderstorm)
				break
			case rangeId >= 300 && rangeId <= 321:
				setIcon(icons.Drizzle)
				break
			case rangeId >= 500 && rangeId <= 521:
				setIcon(icons.Rain)
				break
			case rangeId >= 600 && rangeId <= 622:
				setIcon(icons.Snow)
				break
			case rangeId >= 701 && rangeId <= 781:
				setIcon(icons.Atmosphere)
				break
			case rangeId === 800:
				setIcon(icons.Clear)
				break
			case rangeId >= 801 && rangeId <= 804:
				setIcon(icons.Clouds)
				break
			default:
				setIcon(icons.Clouds)
		}
	}

	function calCelsius(temp) {
		let cell = Math.floor(temp - 273.15)
		return cell
	}

	const getWeather = async (e) => {
		e.preventDefault()

		const country = e.target.elements.country.value
		const city = e.target.elements.city.value

		if (country && city) {
			const api_call = await fetch(
				`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
			)

			const response = await api_call.json()

			setCity(`${response.name}, ${response.sys.country}`)
			setCountry(response.sys.country)
			setMain(response.weather[0].main)
			setCelsius(calCelsius(response.main.temp))
			setTemp_max(calCelsius(response.main.temp_max))
			setTemp_min(calCelsius(response.main.temp_min))
			setDescription(response.weather[0].description)
			setError(false)

			// seting icons
			get_WeatherIcon(weatherIcon, response.weather[0].id)
		} else {
			setError(true)
		}
	}

	return (
		<motion.div
			className='App'
			initial={{ opacity: 0, translateX: -50 }}
			animate={{ opacity: 1, translateX: 0 }}
			transition={{ duration: 0.3, delay: 0.5 }}
		>
			<Form loadweather={getWeather} error={error} />
			<Weather
				cityname={city}
				weatherIcon={icon}
				temp_celsius={celsius}
				temp_max={temp_max}
				temp_min={temp_min}
				description={description}
			/>
		</motion.div>
	)
}

export default WeatherPage
