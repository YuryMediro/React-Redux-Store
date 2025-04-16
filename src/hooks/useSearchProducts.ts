import { useEffect, useState } from 'react'
import { ProductsType } from '../features/products/productsSlice'

interface useSearchProductsProps {
	products: ProductsType[]
	searchQuery: string
}

export const useSearchProducts = ({
	products,
	searchQuery,
}: useSearchProductsProps) => {
	const [filteredProducts, setFilteredProducts] =
		useState<ProductsType[]>(products) // Локальное состояние для отфильтрованных книг

	useEffect(() => {
		if (!searchQuery.trim()) {
			setFilteredProducts(products) // Если поле поиска пустое, возвращаем полный список продуктов
		} else {
			const lowerSearch = searchQuery.toLowerCase() // Приводим ввод пользователя к нижнему регистру

			setFilteredProducts(
				products.filter(
					product =>
						product.title.toLowerCase().includes(lowerSearch) || // Проверяем, есть ли запрос в названии продукта, includes проверяет, есть ли искомый элемент в массиве.
						product.description.toLowerCase().includes(lowerSearch) ||
						product.category.name.toLowerCase().includes(lowerSearch)
				)
			)
		}
	}, [products, searchQuery])

	return { filteredProducts }
}
