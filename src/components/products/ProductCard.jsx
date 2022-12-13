import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBasket } from '../../contexts/basketContext'
import { useFav } from '../../contexts/favotiteContext'
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone'
import BookmarksTwoToneIcon from '@mui/icons-material/BookmarksTwoTone'
import { motion } from 'framer-motion'
import CardMedia from '@mui/material/CardMedia'
import '../../styles/Product2.css'
import '../../styles/ProductCard.css'
import PostComments from './PostComments'

// import Like from './Like'
// import CommentsModal from '../posts/PostComments'
import ShoppingBasketTwoToneIcon from '@mui/icons-material/ShoppingBasketTwoTone'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone'
import FavoriteIcon from '@mui/icons-material/Favorite'
import axios from 'axios'
// import BootstrapButton from './CardButton'

const ProductCard = ({ item, i }) => {
	const { addProductToBasket, deleteProductInBasket } = useBasket()
	const { addProductToFavorite, deleteProductInFavorite } = useFav()

	const [basket, setBasket] = useState(false)
	const [favorite, setFavorite] = useState(false)
	const [onLike, setOnLike] = useState(false)
	const [like, setLike] = useState(0)

	const navigate = useNavigate()

	return (
		<motion.div
			initial={{ opacity: 0, translateX: -50 }}
			animate={{ opacity: 1, translateX: 0 }}
			transition={{ duration: 0.3, delay: i * 0.5 }}
			style={{
				boxShadow: 'none',
				background: 'rgba(122, 122, 122, 0.8)',
				width: '400px',
				borderRadius: '20px',
				color: 'white',
				margin: '0 10px 50px',
			}}
		>
			<div className='card__inner'>
				<CardMedia
					className='card__inner-image'
					style={{
						borderRadius: '18px',
						background: '#000',
						// width: '23vw',
						// height: '20vw',
						margin: '0 auto ',
					}}
					component='img'
					alt={item.image}
					// height='140'
					image={item.image}
				/>
				<div className='card__inner2'>
					<div className='card__inner-text' style={{ marginTop: '20px' }}>
						<div>Title: {item.title}</div>

						<div>Price: {item.price}$</div>
					</div>
					<div className='card-icons'>
						{/* <Like />
						<CommentsModal item={item} /> */}
						<div
							style={{ color: 'black' }}
							onClick={() => setFavorite(!favorite)}
						></div>
					</div>
				</div>

				<div className='btn-block'>
					{basket ? (
						<ShoppingBasketIcon
							style={{ color: 'black' }}
							className='basket-btn'
							onClick={() => {
								setBasket(!basket)
								deleteProductInBasket(item.id)
							}}
						/>
					) : (
						<ShoppingBasketTwoToneIcon
							style={{ color: 'black' }}
							className='basket-btn'
							onClick={() => {
								setBasket(!basket)
								addProductToBasket(item)
							}}
						/>
					)}
					{favorite ? (
						<BookmarksTwoToneIcon
							style={{ color: 'black' }}
							className='favorite-btn'
							onClick={() => {
								setFavorite(!favorite)
								deleteProductInFavorite(item)
							}}
						/>
					) : (
						<BookmarkTwoToneIcon
							style={{ color: 'black' }}
							className='favorite-btn'
							onClick={() => {
								setFavorite(!favorite)
								addProductToFavorite(item)
							}}
						/>
					)}
					<PostComments item={item} />
					{onLike ? (
						<FavoriteIcon
							onClick={async () => {
								setOnLike(!onLike)
								setLike(like - 1)
							}}
							style={{ color: 'red' }}
							className='like-btn'
						/>
					) : (
						<FavoriteTwoToneIcon
							onClick={() => {
								setOnLike(!onLike)
								setLike(like + 1)
							}}
							style={{ color: 'black' }}
							className='like-btn'
						/>
					)}
				</div>
			</div>
		</motion.div>
	)
}

export default ProductCard
