import React from 'react'
import SiteBar from './components/SiteBar'
import Background from './components/Background'
import AuthContextProvider from './contexts/authContext'
import ProductContextProvider from './contexts/productsContext'
import { PersonContextProvider } from './contexts/peopleDataContext'
import FavoriteContextProvider from './contexts/favotiteContext'
import BasketContextProvider from './contexts/basketContext'

function App() {
	return (
		<BasketContextProvider>
			<FavoriteContextProvider>
				<PersonContextProvider>
					<ProductContextProvider>
						<AuthContextProvider>
							<Background />
							<SiteBar />
						</AuthContextProvider>
					</ProductContextProvider>
				</PersonContextProvider>
			</FavoriteContextProvider>
		</BasketContextProvider>
	)
}

export default App
