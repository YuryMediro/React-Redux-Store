import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
import { Category } from '../../types/categoryType'

interface initialStateProps {
	isLoading: boolean
	list: Category[]
}

const initialState: initialStateProps = {
	list: [],
	isLoading: false,
}

export const getCategories = createAsyncThunk(
	'categories/getCategories',
	async (_, thunkAPI) => {
		try {
			const res = await axios(`${BASE_URL}/categories`)
			return res.data
		} catch (err) {
			console.log(err)
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(
			getCategories.fulfilled,
			(state, action: PayloadAction<Category[]>) => {
				state.list = action.payload
			}
		)
		builder.addCase(getCategories.pending, state => {
			state.isLoading = true
		})
		builder.addCase(getCategories.rejected, state => {
			state.isLoading = false
		})
	},
})

export default categoriesSlice.reducer
