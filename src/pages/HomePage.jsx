import React from 'react'
// import '../styles/HomePage.css'
import '../styles/HomePage.css'
import HeaderImage from '../images/zyro-image.png'
import { motion } from 'framer-motion'
import '../styles/adaptive/HomePage-adaptive.css'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
	const navigate = useNavigate()

	return (
		<motion.div
			className='home-container'
			initial={{ opacity: 0, translateX: -50 }}
			animate={{ opacity: 1, translateX: 0 }}
			transition={{ duration: 0.3, delay: 0.5 }}
		>
			<div className='home-container__left'>
				<h1 className='home-container__left-text-big'>
					<span className='logo-color'>Health</span> решение для всех ваших
					проблем со здоровьем
				</h1>
				<p className='home-container__left-text-small'>
					По вашим характеристикам мы подбираем вам блюдо, тренировки,
					расписание
				</p>
				<motion.button
					whileHover={{ scale: 1.1 }}
					className='home-container__left-button def-block2'
					onClick={() => navigate('/create-data-person')}
				>
					Начать
				</motion.button>
			</div>
			<motion.div whileHover={{ scale: 1.2 }} className='home-container-right'>
				<img src={HeaderImage} alt='error' className='home-container-img' />
			</motion.div>
			<motion.button
				whileHover={{ scale: 1.2 }}
				className='home-container__left-button def-none2'
			>
				Начать
			</motion.button>
		</motion.div>
	)
}

export default HomePage
