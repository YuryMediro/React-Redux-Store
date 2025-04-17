import { ShoppingCart } from '../../components/ShoppingCart/ShoppingCart'
import { SidebarContainer } from '../../components/Sidebar/SidebarContainer'
import { Layout } from '../../widgets/Layout/Layout'
import s from './ShoppingCartPage.module.css'

interface ShoppingCartPageProps {}

export const ShoppingCartPage = ({}: ShoppingCartPageProps) => {
	return (
		<section className={s.wrapper}>
			<Layout>
				<div className={s.container}>
					<SidebarContainer />
					<ShoppingCart />
				</div>
			</Layout>
		</section>
	)
}
