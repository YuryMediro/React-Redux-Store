import { Banner } from '@components/Banner/Banner'
import s from './HomePage.module.css'
import { CategoriesContainer } from '@components/Categories/CategoriesContainer'
import { Poster } from '@components/Poster/Poster'
import { LessProductsContainer } from '@components/Product/LessProducts/LessProductsContainer'
import { ProductsContainer } from '@components/Product/ProductsContainer'
import { SidebarContainer } from '@components/Sidebar/SidebarContainer'
import { Layout } from '@widgets/Layout/Layout'

export const HomePage = () => {
	return (
		<section className={s.wrapper}>
			<Layout>
				<div className={s.container}>
					<SidebarContainer />
					<Poster />
				</div>
				<ProductsContainer />
				<CategoriesContainer />
				<Banner />
				<LessProductsContainer />
			</Layout>
		</section>
	)
}
