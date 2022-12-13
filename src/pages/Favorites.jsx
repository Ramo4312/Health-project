import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import '../styles/Favorites.css'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect } from 'react'
import { useFav } from '../contexts/favotiteContext'

const Favorites = () => {
	const { getFavorite, favorites, deleteProductInFavorite } = useFav()

	useEffect(() => {
		getFavorite()
	}, [])

	return (
		<div className='favorites-list'>
			{favorites?.products.map(elem => (
				<div key={elem.item.id} className='relativeCard'>
					<Card
						style={{
							position: 'relative',
							borderRadius: '25px',
							height: '620px',
							padding: '1vw',
							margin: '1.5vw',
							border: '4px solid yellow',
							background:
								'linear-gradient(180deg, rgb(255,255, 0, .4), rgb(255,255,255, .7)), url(https://www.cyberpunk.net/build/images/cosplay-contest/bg-b0fe6faf.jpg)',
						}}
						sx={{ maxWidth: 345 }}
						key={elem.item.id}
					>
						<CardMedia
							className='fav-image'
							style={{
								borderRadius: '1vw',
								background: '#000',
								transition: '.5s',
							}}
							component='img'
							image={elem.item.image}
							alt={elem.item.title}
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant='h5'
								component='div'
								sx={{ color: 'black' }}
							>
								Author: <b>{elem.item.author}</b>
							</Typography>
							<Typography variant='body2' style={{ color: 'black' }}>
								Title: {elem.item.title}
							</Typography>
							<br />
							<Typography variant='body2' style={{ color: 'black' }}>
								{elem.item.description}
							</Typography>
							<br />
							<Typography variant='body2'>
								Price: <b>{elem.item.price}$</b>
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								style={{ position: 'absolute', bottom: '10px' }}
								size='small'
								color='error'
								variant='contained'
								endIcon={<DeleteIcon />}
								onClick={() => deleteProductInFavorite(elem.item.id)}
							>
								Delete in favorites
							</Button>
						</CardActions>
					</Card>
				</div>
			))}
		</div>
	)
}

export default Favorites
