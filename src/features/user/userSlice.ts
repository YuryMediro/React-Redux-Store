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
	error: string | null
}

const initialState: initialStateProps = {
	currentUser: JSON.parse(localStorage.getItem('user') || 'null'),
	isLoading: false,
	error: null,
}

export const createUser = createAsyncThunk(
	'users/createUser',
	async (payload: Omit<User, 'id'>, thunkAPI) => {
		try {
			await axios.post(`${BASE_URL}/users/is-available`, {
				email: payload.email,
			})

			const res = await axios.post(`${BASE_URL}/users`, payload)
			return res.data
		} catch (err) {
			console.log(err)
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const loginUser = createAsyncThunk(
	'users/loginUser',
	async (payload: { email: string; password: string }, thunkAPI) => {
		try {
			const { data } = await axios.get<User[]>(`${BASE_URL}/users`)

			const user = data.find(
				u => u.email === payload.email && u.password === payload.password
			)

			if (!user) {
				return thunkAPI.rejectWithValue('User not found')
			}
			return user
		} catch (err) {
			console.log(err)
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logoutUser: state => {
			state.currentUser = null
			localStorage.removeItem('user')
		},
	},
	extraReducers: builder => {
		builder.addCase(
			createUser.fulfilled,
			(state, action: PayloadAction<User>) => {
				state.currentUser = action.payload
				state.isLoading = false
				state.error = null
				localStorage.setItem('user', JSON.stringify(action.payload))
			}
		)

		builder.addCase(createUser.pending, state => {
			state.isLoading = true
			state.error = null
		})

		builder.addCase(createUser.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.payload as string
		})

		builder.addCase(
			loginUser.fulfilled,
			(state, action: PayloadAction<User>) => {
				state.currentUser = action.payload
				state.isLoading = false
				state.error = null
				localStorage.setItem('user', JSON.stringify(action.payload))
			}
		)

		builder.addCase(loginUser.pending, state => {
			state.isLoading = true
			state.error = null
		})

		builder.addCase(loginUser.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.payload as string
		})
	},
})

export const logoutUser = userSlice.actions.logoutUser
export default userSlice.reducer
