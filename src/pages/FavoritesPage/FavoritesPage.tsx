import { Favorites } from '@components/Favorites/Favorites'
import { SidebarContainer } from '@components/Sidebar/SidebarContainer'
import { Layout } from '@widgets/Layout/Layout'
import s from './FaoritesPage.module.css'
export const FavoritesPage = () => {
	return (
		<section className={s.wrapper}>
			<Layout>
				<div className={s.container}>
					<SidebarContainer />
					<Favorites />
				</div>
			</Layout>
		</section>
	)
}
