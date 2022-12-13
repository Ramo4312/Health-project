import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Input } from '@mui/material'
// import { productsContext } from '../../contexts/productsContext'
import SendIcon from '@mui/icons-material/Send'
import axios from 'axios'
import TextsmsTwoToneIcon from '@mui/icons-material/TextsmsTwoTone'
// import ChatIcon from '@mui/icons-material/Chat'
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

export default function BasicModal({ item }) {
	// const { saveChanges, onePost } = useContext(productsContext)
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const [comment, setComment] = useState('')
	const [postComment, setPostComment] = useState(null)

	async function saveComment() {
		item.comments.push(comment)
		setPostComment(item.comments)
		let obj = {
			...item,
			comments: postComment,
		}
		await axios.patch(`http://localhost:8000/products/${item.id}`, obj)
		// console.log(obj)
		setComment('')
	}

	return (
		<div>
			<ChatTwoToneIcon
				variant='outlined'
				onClick={handleOpen}
				style={{
					color: 'black',
				}}
				className='favorite-btn'
			/>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<div
					style={{
						backgroundPositionY: '10%',
						margin: '10vw auto',
						width: '600px',
						// height: '40vw',
						padding: '3vw',
					}}
				>
					<Box
						style={{
							backgroundColor: '#191a1e',
							color: 'white',
							width: '100%',
							height: '100%',
							// top: '50%',
							left: '50%',
							padding: '4vw',
							borderRadius: '2vw',
						}}
					>
						<Typography id='modal-modal-title' variant='h6' component='h2'>
							Comments
						</Typography>
						<br />
						<ul key={item.id} id='modal-modal-description' sx={{ mt: 2 }}>
							{item.comments.map(elem => (
								<div key={item.id}>
									<li key={elem.id}>{elem}</li>
									<hr style={{ width: '200px', margin: '1px' }} />
								</div>
							))}
						</ul>
						<br />
						<Input
							placeholder='message'
							value={comment}
							color='secondary'
							style={{
								marginRight: '40px',
								backgroundColor: 'rgb(255,255,255, .2)',
								boxShadow: '0 2px 0 white',
								borderRadius: '.3vw .3vw 0 0',
								color: 'white',
								paddingLeft: '2vw',
							}}
							onChange={e => setComment(e.target.value)}
						/>
						<Button
							variant='contained'
							color='success'
							onClick={() => saveComment()}
							endIcon={<SendIcon />}
						>
							Send
						</Button>
					</Box>
				</div>
			</Modal>
		</div>
	)
}
