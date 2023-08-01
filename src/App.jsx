import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './Pages/Login'
import './index.css'
import Registeration from './Pages/Registeration'
import Home from './Pages/Home'
import Profile from './Pages/Profile'

function App() {
	const PrivateRoute = ({ isAuth, children }) => {
		if (isAuth) {
			return children
		}
		return <Navigate to="/" />
	}

	const PublicRoute = ({ isAuth, children }) => {
		if (!isAuth) {
			return children
		}
		return <Navigate to="/Home" />
	}

	const isAuth = useSelector((state) => state.persistedReducer?.isAuth) || false

	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={
						<PublicRoute isAuth={isAuth}>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path="/Registeration"
					element={
						<PublicRoute isAuth={isAuth}>
							<Registeration />
						</PublicRoute>
					}
				/>
				<Route
					path="/Home"
					element={
						<PrivateRoute isAuth={isAuth}>
							<Home />
						</PrivateRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<PrivateRoute isAuth={isAuth}>
							<Profile />
						</PrivateRoute>
					}
				/>
			</Routes>
		</div>
	)
}

export default App
