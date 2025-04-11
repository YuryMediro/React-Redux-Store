import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'

export interface User {
	id: number
	name: string
	email: string
	password: string
	avatar: string
	role: string
}
interface initialStateProps {
	currentUser: User | null
	isLoading: boolean
}

const initialState: initialStateProps = {
	currentUser: null,
	isLoading: false,
}

export const createUser = createAsyncThunk(
	'users/createUser',
	async (payload, thunkAPI) => {
		try {
			const res = await axios.post(`${BASE_URL}/users`, payload)
			return res.data
		} catch (err) {
			console.log(err)
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(
			createUser.fulfilled,
			(state, action: PayloadAction<User>) => {
				state.currentUser = action.payload
				state.isLoading = false
			}
		)
		builder.addCase(createUser.pending, state => {
			state.isLoading = true
		})
		builder.addCase(createUser.rejected, state => {
			state.isLoading = false
		})
	},
})


export default userSlice.reducer;

