import { Banner } from '../../components/Banner/Banner'
import { CategoriesContainer } from '../../components/Categories/CategoriesContainer'
import { Poster } from '../../components/Poster/Poster'
import { ProductsContainer } from '../../components/Product/ProductsContainer'
import { SidebarContainer } from '../../components/Sidebar/SidebarContainer'
import { Layout } from '../../widgets/Layout/Layout'
import s from './HomePage.module.css'

export const HomePage = () => {
	return (
		<section className={s.home}>
			<Layout>
				<div className={s.container}>
					<SidebarContainer />
					<Poster />
				</div>
				<ProductsContainer />
				<CategoriesContainer />
				<Banner />
			</Layout>
		</section>
	)
}
