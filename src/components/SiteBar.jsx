import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import MainRoutes from '../MainRoutes'
import Avatar from '@mui/material/Avatar'

// app bar
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import InputLabel from '@mui/material/InputLabel'

import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
// icons

import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone'
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone'
import StoreTwoToneIcon from '@mui/icons-material/StoreTwoTone'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import BookTwoToneIcon from '@mui/icons-material/BookTwoTone'
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone'
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone'
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone'
import CloudTwoToneIcon from '@mui/icons-material/CloudTwoTone'

import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { Typography } from '@mui/material'
import { useProduct } from '../contexts/productsContext'
// import '@fontsource/nunito/400.css'

const drawerWidth = 200

function ResponsiveDrawer(props) {
	const navigate = useNavigate()
	const { window } = props
	const [mobileOpen, setMobileOpen] = React.useState(false)

	const location = useLocation()

	const url = `${location.pathname}`

	const { user, logout, checkAuthorization } = useAuth()
	const { fetchByParams, products, getCategories, getProducts, allCategories } =
		useProduct()
	const [searchParams, setSearchParams] = useSearchParams()

	//product filter

	useEffect(() => {
		getProducts()
	}, [searchParams])

	useEffect(() => {
		getCategories()
	}, [])

	function unique(arr) {
		let result = []

		for (let str of arr) {
			if (!result.includes(str)) {
				result.push(str)
			}
		}

		return result
	}

	// useEffect(() => {})
	let categories = []
	products.map(item => {
		categories.push(item.category)
	})

	allCategories.forEach(item => {
		categories.push(item.category)
	})

	let uniqCategory = unique(categories)

	//end filter

	//search products

	const [search, setSearch] = useState(searchParams.get('q') || '')

	useEffect(() => {
		setSearchParams({
			q: search,
		})
	}, [search])

	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuthorization()
		}
	}, [])

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	const [anchorEl, setAnchorEl] = React.useState(null)
	const [anchorEl2, setAnchorEl2] = React.useState(null)

	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

	const isMenuOpen = Boolean(anchorEl)
	const isMenuOpen2 = Boolean(anchorEl2)
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

	const handleProfileMenuOpen = event => {
		setAnchorEl(event.currentTarget)
	}
	const handleProfileMenuOpen2 = event => {
		setAnchorEl2(event.currentTarget)
	}

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
		handleMobileMenuClose()
	}

	const handleMenuClose2 = () => {
		setAnchorEl2(null)
	}

	const handleMobileMenuOpen = event => {
		setMobileMoreAnchorEl(event.currentTarget)
	}

	const [category, setCategory] = React.useState('')

	const handleChange = event => {
		setCategory(event.target.value)
	}

	const menuId = 'primary-search-account-menu'
	const menuId2 = 'primary-search-account-menu'

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem
				onClick={() => {
					handleMenuClose()
					navigate('/profile')
				}}
			>
				Profile
			</MenuItem>
			<MenuItem
				onClick={() => {
					navigate('/register')
					handleMenuClose()
				}}
			>
				Register
			</MenuItem>
			<MenuItem
				onClick={() => {
					navigate('/login')
					handleMenuClose()
				}}
			>
				Login
			</MenuItem>
			{user ? (
				<MenuItem
					onClick={() => {
						logout()
						navigate('/')
						handleMenuClose()
					}}
				>
					Logout
				</MenuItem>
			) : null}
		</Menu>
	)

	const renderMenu2 = (
		<Menu
			className='menuList2'
			anchorEl={anchorEl2}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
			id={menuId2}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen2}
			onClose={handleMenuClose2}
		>
			{user ? (
				<div>
					<MenuItem
						onClick={() => {
							navigate('/edit_person')
							handleMenuClose2()
						}}
					>
						Редактировать профиль
					</MenuItem>
				</div>
			) : (
				<Typography>
					Нужно <br /> Зарегистрироваться
				</Typography>
			)}
		</Menu>
	)

	const mobileMenuId = 'primary-search-account-menu-mobile'
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton size='large' aria-label='show 4 new mails' color='inherit'>
					<Badge badgeContent={5} color='error'>
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					size='large'
					aria-label='show 17 new notifications'
					color='inherit'
				>
					<Badge badgeContent={17} color='error'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size='large'
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	)

	const menuList = [
		{
			title: 'Главное',
			page: '/',
			icons: <HomeTwoToneIcon fontSize='large' />,
		},
		{
			title: 'Магазин',
			page: '/market',
			icons: <StoreTwoToneIcon fontSize='large' />,
		},
		{
			title: 'Расписание',
			page: '*',
			icons: <CalendarMonthTwoToneIcon fontSize='large' />,
		},
	]

	const menuList2 = [
		{
			title: 'Изабранное',
			page: '/favorites',
			icons: <BookTwoToneIcon fontSize='large' />,
		},
		{
			title: 'Корзина',
			page: '/basket',
			icons: <ShoppingCartTwoToneIcon fontSize='large' />,
		},
		{
			title: 'Погода',
			page: '/weather',
			icons: <CloudTwoToneIcon fontSize='large' />,
		},
	]

	const drawer = (
		<>
			<div>
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<h2>Health</h2>
				</Toolbar>
				<Divider />
				<List>
					{menuList.map(item => (
						<ListItem
							key={item.title}
							disablePadding
							onClick={() => navigate(item.page)}
						>
							<ListItemButton>
								<ListItemIcon>{item.icons}</ListItemIcon>
								<ListItemText primary={item.title} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{menuList2.map(item => (
						<ListItem
							key={item.title}
							disablePadding
							onClick={() => navigate(item.page)}
						>
							<ListItemButton>
								<ListItemIcon>{item.icons}</ListItemIcon>
								<ListItemText primary={item.title} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<div className='settings' onClick={handleProfileMenuOpen2}>
					<Avatar
						src='..'
						alt={user[0] == '"' ? user[1].toUpperCase() : user.toUpperCase()}
					/>
					Настройки
				</div>
			</div>
			{renderMenu2}
		</>
	)

	const container =
		window !== undefined ? () => window().document.body : undefined

	return (
		<Box sx={{ display: 'flex', background: 'transparent' }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{
					width: { md: `calc(100% - ${drawerWidth}px)` },
					ml: { md: `${drawerWidth}px` },
				}}
				className='appBar'
			>
				<Toolbar>
					<IconButton
						className='menu-button'
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, ml: 1, display: { md: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: '100%',
						}}
					>
						<div aria-disabled='on' className='span-search'>
							<input
								readOnly={url == '/market' ? false : true}
								className='input-search'
								type='text'
								placeholder='Search'
								id='search-input'
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>
							<span></span>
						</div>

						<Box
							sx={{ minWidth: 120 }}
							className='select-sitebar'
							style={
								url == '/market' ? { display: 'block' } : { display: 'none' }
							}
						>
							<FormControl
								sx={{ borderColor: 'red' }}
								color='secondary'
								// variant='standard'
								fullWidth
								size='small'
								className='form-select'
							>
								<InputLabel
									className='select-label'
									id='demo-simple-select-label'
								>
									Category
								</InputLabel>
								<Select
									className='select-value'
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									defaultValue={category}
									label='Category'
									onChange={e => fetchByParams('category', e.target.value)}
								>
									<MenuItem value='all'>All</MenuItem>
									{uniqCategory.map((item, index) => (
										<MenuItem key={index} value={item}>
											{item}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
					</div>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<IconButton
							onClick={() => navigate('/chat')}
							size='large'
							aria-label='show 4 new mails'
							color='inherit'
						>
							<Badge badgeContent={4} color='error'>
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton
							size='large'
							aria-label='show 17 new notifications'
							color='inherit'
						>
							<Badge badgeContent={15} color='error'>
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							size='large'
							edge='end'
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='inherit'
						>
							<Avatar
								src='..'
								alt={
									user[0] == '"' ? user[1].toUpperCase() : user.toUpperCase()
								}
							/>
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
			<Box
				component='nav'
				sx={{
					width: { md: drawerWidth },
					flexShrink: { md: 0 },
					background: 'transparent',
				}}
				aria-label='mailbox folders'
			>
				<Drawer
					className='sitebar3'
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', md: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: 'none', md: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					width: { md: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				<MainRoutes />
			</Box>
		</Box>
	)
}

ResponsiveDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
}

export default ResponsiveDrawer
