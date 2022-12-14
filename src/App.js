import React from 'react'
import SiteBar from './components/SiteBar'
import Background from './components/Background'
import AuthContextProvider from './contexts/authContext'
import ProductContextProvider from './contexts/productsContext'
import { PersonContextProvider } from './contexts/peopleDataContext'
import FavoriteContextProvider from './contexts/favotiteContext'
import BasketContextProvider from './contexts/basketContext'
import MainRoutes from './MainRoutes'

function App() {
	return (
		<BasketContextProvider>
			<FavoriteContextProvider>
				<PersonContextProvider>
					<ProductContextProvider>
						<AuthContextProvider>
							{/* <Background /> */}
							{/* <SiteBar /> */}
							<MainRoutes />
						</AuthContextProvider>
					</ProductContextProvider>
				</PersonContextProvider>
			</FavoriteContextProvider>
		</BasketContextProvider>
	)
}

export default App
