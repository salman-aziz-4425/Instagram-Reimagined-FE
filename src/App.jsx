import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import './index.css'
import Registeration from './Pages/Registeration'
import Home from './Pages/Home'
import Profile from './Pages/Profile'

function App() {
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route path="/Registeration" element={<Registeration />}></Route>
				<Route path="/Home" element={<Home />}></Route>
				<Route path="/profile" element={<Profile />}></Route>
			</Routes>
		</div>
	)
}

export default App
