import { useParams } from 'react-router-dom'
import { SingleProduct } from './SingleProduct'
import { useGetProductByIdQuery } from '@features/api/apiSlice'
import s from './SingleProduct.module.css'
interface SingleProductContainerProps {}

export const SingleProductContainer = ({}: SingleProductContainerProps) => {
	const { id } = useParams()

	const { data: product, error, isLoading } = useGetProductByIdQuery(id)

	if (isLoading) return <p>Loading...</p>
	if (error) return <p>Ошибка загрузки товара</p>
	// Проверяем, существует ли product, перед рендером
	if (!product) return <p>Товар не найден</p>

	return (
		<div className={s.wrapper}>
			<SingleProduct product={product} />
		</div>
	)
}
