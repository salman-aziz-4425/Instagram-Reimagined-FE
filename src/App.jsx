import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import './index.css'
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Login />} />
			</Routes>
		</div>
	)
}

export default App
