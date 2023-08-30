import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<PersistGate loading={null} persistor={persistor}>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</PersistGate>
)
