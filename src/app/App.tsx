import { AppRoutes } from './AppRoutes'
import s from './App.module.css'
import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'
import { Sidebar } from '../components/Sidebar/Sidebar'

interface AppProps {}

export const App = ({}: AppProps) => {
	return (
		<div className={s.app}>
			<Header />
			<div className={s.container}>
				<Sidebar />
				<AppRoutes />
			</div>
			<Footer />
		</div>
	)
}
