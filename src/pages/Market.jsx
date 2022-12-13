import React, { useEffect, useState } from 'react'
import ProductCard from '../components/products/ProductCard'
import { useProduct } from '../contexts/productsContext'
import { useLocation, useSearchParams } from 'react-router-dom'
import '../styles/Market.css'
import Pagination from '@mui/material/Pagination'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const Market = () => {
	const { getProducts, fetchByParams, products, getCategories, allCategories } =
		useProduct()
	const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		getProducts()
	}, [])

	const [page, setPage] = useState(1)

	const itemsOnPage = 6

	const count = Math.ceil(products.length / itemsOnPage)

	const handlePage = (e, p) => {
		setPage(p)
	}

	function currentData() {
		const begin = (page - 1) * itemsOnPage
		const end = begin + itemsOnPage

		return products.slice(begin, end)
	}

	return (
		<div className='market-list'>
			<Pagination
				className='pagination'
				count={count}
				page={page}
				onChange={handlePage}
				variant='outlined'
				style={{ marginTop: '20px' }}
			/>
			<div
				style={{
					width: '90%',
					margin: ' auto',
					display: 'flex',
					justifyContent: 'space-around',
					flexWrap: 'wrap',
				}}
			>
				{currentData()?.map((item, i) => (
					<ProductCard key={item.id} item={item} i={i} />
				))}
			</div>
		</div>
	)
}

export default Market
