import { useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../../../features/api/apiSlice'
import { SingleProduct } from './SingleProduct'

interface SingleProductContainerProps {}

export const SingleProductContainer = ({}: SingleProductContainerProps) => {
	const { id } = useParams()

	const { data: product, error, isLoading } = useGetProductByIdQuery(id)

	if (isLoading) return <p>Loading...</p>
	if (error) return <p>Ошибка загрузки Продукта</p>
	// Проверяем, существует ли product, перед рендером
	if (!product) return <p>Книга не найдена</p>

	return <SingleProduct product={product} />
}
