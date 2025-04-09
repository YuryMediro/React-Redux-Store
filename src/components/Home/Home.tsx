import { ProductsContainer } from '../Product/ProductsContainer'

interface HomeProps {}

export const Home = ({}: HomeProps) => {
	return (
		<section>
			<ProductsContainer />
		</section>
	)
}
