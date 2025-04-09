import { AppRoutes } from './AppRoutes'
import s from './App.module.css'
import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'
import { SidebarContainer } from '../components/Sidebar/SidebarContainer'
import { Poster } from '../components/Poster/Poster'


interface AppProps {}

export const App = ({}: AppProps) => {
	return (
		<div className={s.app}>
			<Header />
			<div className={s.container}>
				<SidebarContainer />
				<Poster />
			</div>
				<AppRoutes />
			<Footer />
		</div>
	)
}
