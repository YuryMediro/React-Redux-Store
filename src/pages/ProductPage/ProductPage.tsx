import { Products } from '../../components/Product/Products'
import { SingleProductContainer } from '../../components/Product/SingleProduct/SingleProductContainer'
import { SidebarContainer } from '../../components/Sidebar/SidebarContainer'
import { Layout } from '../../widgets/Layout/Layout'
import s from './ProductPage.module.css'
interface ProductPageProps {}

export const ProductPage = ({}: ProductPageProps) => {
	return (
		<section className={s.productPage}>
			<Layout>
				<div className={s.container}>
					<SidebarContainer />
					<SingleProductContainer />
				</div>
				<Products title='Related products' products={[]} />
			</Layout>
		</section>
	)
}
