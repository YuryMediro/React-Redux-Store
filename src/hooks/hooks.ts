import { ProductsType } from '@features/products/productsSlice'
import { useState, useEffect, useRef } from 'react'

export const useVisible = (initial: boolean) => {
	const [visible, setVisible] = useState<boolean>(initial)

	const handleOnClick = () => {
		setVisible(prev => !prev)
	}

	return { visible, handleOnClick }
}

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

// хук для закрытия окна поиска при клике вне его
export const useClickOutside = (isOpen: boolean, onClose: () => void) => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen, onClose])

	return ref
}
