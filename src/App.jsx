import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import './index.css'
import Registeration from './Pages/Registeration'
import Home from './Pages/Home'

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/Registeration" element={<Registeration />}></Route>
				<Route path="/Home" element={<Home />}></Route>
			</Routes>
		</div>
	)
}

export default App
