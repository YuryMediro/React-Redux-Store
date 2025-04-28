import { useParams } from 'react-router-dom'
import s from './ProductPage.module.css'
import { Products } from '@components/Product/Products'
import { SingleProductContainer } from '@components/Product/SingleProduct/SingleProductContainer'
import { SidebarContainer } from '@components/Sidebar/SidebarContainer'
import { useGetProductByIdQuery, useGetProductsByCategoryQuery } from '@features/api/apiSlice'
import { Layout } from '@widgets/Layout/Layout'

export const ProductPage = () => {
	const { id } = useParams()
	const { data: product } = useGetProductByIdQuery(id)
	const categoryId = product?.category.id
	const { data: relatedProducts = [] } = useGetProductsByCategoryQuery(
		categoryId || ''
	)
	return (
		<section className={s.wrapper}>
			<Layout>
				<div className={s.container}>
					<SidebarContainer />
					<SingleProductContainer />
				</div>
				<Products
					title='Related products'
					products={relatedProducts.filter(p => p.id !== product.id)}
				/>
			</Layout>
		</section>
	)
}
