import { Banner } from '../Banner/Banner'
import { CategoriesContainer } from '../Categories/CategoriesContainer'
import { ProductsContainer } from '../Product/ProductsContainer'
import s from './Home.module.css'

interface HomeProps {}

export const Home = ({}: HomeProps) => {
	return (
		<section className={s.home}>
			<ProductsContainer />
			<CategoriesContainer />
			<Banner/>
		</section>
	)
}
