import { AppRoutes } from './AppRoutes'
import s from './App.module.css'

interface AppProps {}

export const App = ({}: AppProps) => {
	return (
		<div className={s.app}>
			{/* <Header />
			<div className={s.container}>
				<SidebarContainer />
				<Poster />
			</div>
			<AppRoutes />
			<Footer /> */}
			<AppRoutes />
		</div>
	)
}
