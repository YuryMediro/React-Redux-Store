import { ProductsType } from '@features/products/productsSlice'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '@utils/constants'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: builder => ({
		getProductById: builder.query({
			query: id => `/products/${id}`,
		}),
		searchProducts: builder.query<ProductsType[], string>({
			query: searchTerm => `/products/?title=${searchTerm}`,
		}),
		getProductsByCategory: builder.query<ProductsType[], number>({
			query: categoryId => `/categories/${categoryId}/products`,
		}),
	}),
})

export const {
	useGetProductByIdQuery,
	useSearchProductsQuery,
	useGetProductsByCategoryQuery,
} = apiSlice
