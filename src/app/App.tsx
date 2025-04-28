import { AppRoutes } from './AppRoutes'
import s from './App.module.css'

interface AppProps {}

export const App = ({}: AppProps) => {
	return (
		<div className={s.app}>
			<AppRoutes />
		</div>
	)
}
``