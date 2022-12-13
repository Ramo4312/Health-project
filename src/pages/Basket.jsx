import React, { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'

import TableRow from '@mui/material/TableRow'

import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

import DeleteIcon from '@mui/icons-material/Delete'

import '../styles/Basket.css'
import { useBasket } from '../contexts/basketContext'
import Button from '@mui/material/Button'
import ChildModal from '../components/products/OrderForm'

export default function EnhancedTable() {
	const { getBasket, basket, changeProductCount, deleteProductInBasket } =
		useBasket()

	useEffect(() => {
		getBasket()
	}, [])

	return (
		<>
			{basket ? (
				<TableContainer className='basket' component={Paper}>
					<Table sx={{ minWidth: 640 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell sx={{ color: 'white' }} align='center'>
									Image
								</TableCell>
								<TableCell sx={{ color: 'white' }} align='center'>
									Name
								</TableCell>
								<TableCell sx={{ color: 'white' }} align='center'>
									Category
								</TableCell>
								<TableCell sx={{ color: 'white' }} align='center'>
									Price
								</TableCell>
								<TableCell sx={{ color: 'white' }} align='center'>
									Count
								</TableCell>
								<TableCell sx={{ color: 'white' }} align='center'>
									Sub Price
								</TableCell>
								<TableCell sx={{ color: 'white' }} align='center'>
									Delete
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{basket?.products.map(row => (
								<TableRow
									key={row.item.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell align='center' style={{ marginLeft: '2vw' }}>
										<img src={row.item.image} alt='' width='100' height='100' />
									</TableCell>
									<TableCell sx={{ color: 'white' }} align='center'>
										{row.item.title}
									</TableCell>
									<TableCell sx={{ color: 'white' }} align='center'>
										{row.item.category}
									</TableCell>
									<TableCell sx={{ color: 'white' }} align='center'>
										{row.item.price}$
									</TableCell>
									<TableCell sx={{ color: 'white' }} align='center'>
										<input
											style={{
												width: '2vw',
												textAlign: 'center',
												border: 'none',
												color: 'white',
												boxShadow: '0 1px 0 white',
												background: 'transparent',
											}}
											type='number'
											value={row.count}
											onChange={e =>
												changeProductCount(e.target.value, row.item.id)
											}
										/>
									</TableCell>
									<TableCell sx={{ color: 'white' }} align='center'>
										{row.subPrice}$
									</TableCell>
									<TableCell sx={{ color: 'white' }} align='center'>
										<Button
											onClick={() => deleteProductInBasket(row.item.id)}
											color='error'
											variant='contained'
											sx={{ my: 6 }}
										>
											<DeleteIcon />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<hr
						style={{
							background:
								'linear-gradient(to left, rgb(0,255,0), rgb(255,255,255), rgb(0, 0,555) 90%)',
							border: ' none',
							height: '2px',
							// boxShadow: ' 0 5px 9px red, 0 10px 9px blue',
						}}
					/>

					<Typography
						style={{ margin: '2vw', color: 'white' }}
						variant='h6'
						component='div'
						align='right'
					>
						Total price: {basket?.totalPrice}$ <br />
						{basket ? <ChildModal totalPrice={basket.totalPrice} /> : null}
					</Typography>
				</TableContainer>
			) : (
				<h2>Loading</h2>
			)}
		</>
	)
}
