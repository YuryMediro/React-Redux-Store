import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../features/store'

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<HashRouter basename='/React-Redux-Store'>
			<App />
		</HashRouter>
	</Provider>
)
