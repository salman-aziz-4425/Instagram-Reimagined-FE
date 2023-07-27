import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import './index.css'
import Registeration from './Pages/Registeration'
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/Registeration" element={<Registeration />}></Route>
			</Routes>
		</div>
	)
}

export default App
