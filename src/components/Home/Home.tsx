import { Layout } from '../../widgets/Layout/Layout'
import { Banner } from '../Banner/Banner'
import { CategoriesContainer } from '../Categories/CategoriesContainer'
import { Poster } from '../Poster/Poster'
import { ProductsContainer } from '../Product/ProductsContainer'
import { SidebarContainer } from '../Sidebar/SidebarContainer'
import s from './Home.module.css'

interface HomeProps {}

export const Home = ({}: HomeProps) => {
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
