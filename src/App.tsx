import React, { FC, useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Feed from './screens/main/Feed'
import Friends from './screens/main/Friends'
import FriendThoughts from './screens/main/FriendThoughts'
import Profile from './screens/main/Profile'
import AuthScreen from './screens/auth/AuthScreen'
import RegisterScreen from './screens/auth/RegisterScreen'
import { authContext } from './context'

const App: FC = () => {
	const [isAuth, setIsAuth] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (localStorage.getItem('auth')) {
			setIsAuth(true)
		}
		setIsLoading(false)
	}, [])

	if (isLoading) {
		return <div>Загрузка</div>
	}

	return isAuth ? (
		<authContext.Provider
			value={{
				isAuth,
				setIsAuth,
				isLoading,
				setIsLoading,
			}}
		>
			<BrowserRouter>
				<Routes>
					<Route path='/feed' element={<Feed />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/friends' element={<Friends />} />
					<Route path='/friend/:id' element={<FriendThoughts />} />
					<Route path='*' element={<Feed />} />
				</Routes>
			</BrowserRouter>
		</authContext.Provider>
	) : (
		<authContext.Provider
			value={{
				isAuth,
				setIsAuth,
			}}
		>
			<BrowserRouter>
				<Routes>
					<Route path='/auth' element={<AuthScreen />} />
					<Route path='/registration' element={<RegisterScreen />} />
					<Route path='*' element={<AuthScreen />} />
				</Routes>
			</BrowserRouter>
		</authContext.Provider>
	)
}

export default App
