import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/constants'
import { ProductsType } from '../products/productsSlice'

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
	}),
})

export const { useGetProductByIdQuery, useSearchProductsQuery } = apiSlice
