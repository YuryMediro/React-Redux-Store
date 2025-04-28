import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '@utils/constants'
import axios from 'axios'

export interface ProductsType {
	id: number
	title: string
	slug: string
	price: number
	description: string
	category: {
		id: number
		name: string
		image?: string
		slug: string
	}
	images: string[]
}

interface initialStateProps {
	isLoading: boolean
	productsList: ProductsType[]
}

const initialState: initialStateProps = {
	productsList: [],
	isLoading: false,
}

export const getProducts = createAsyncThunk(
	'products/getProducts',
	async (_, thunkAPI) => {
		try {
			const res = await axios(`${BASE_URL}/products`)
			return res.data
		} catch (err) {
			console.log(err)
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const getProductsByCategory = createAsyncThunk(
	'products/getProductsByCategory',
	async (categoryId: number, thunkAPI) => {
		try {
			const res = await axios(`${BASE_URL}/categories/${categoryId}/products`)
			return res.data
		} catch (err) {
			console.log(err)
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(
			getProducts.fulfilled,
			(state, action: PayloadAction<ProductsType[]>) => {
				state.productsList = action.payload
			}
		)
		builder.addCase(getProducts.pending, state => {
			state.isLoading = true
		})
		builder.addCase(getProducts.rejected, state => {
			state.isLoading = false
		})

		builder.addCase(
			getProductsByCategory.fulfilled,
			(state, action: PayloadAction<ProductsType[]>) => {
				state.productsList = action.payload
				state.isLoading = false
			}
		)
		builder.addCase(getProductsByCategory.pending, state => {
			state.isLoading = true
		})
		builder.addCase(getProductsByCategory.rejected, state => {
			state.isLoading = false
		})
	},
})

export default productsSlice.reducer
