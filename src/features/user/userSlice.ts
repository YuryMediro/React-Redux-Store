import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '@utils/constants'
import axios from 'axios'

export interface User {
	id: number
	name: string
	email: string
	password: string
	avatar: string
	role: string
}

interface AuthToken {
	access_token: string
	refresh_token: string
}

interface initialStateProps {
	currentUser: User | null
	isLoading: boolean
	error: string | null
	tokens: AuthToken | null
}

const initialState: initialStateProps = {
	currentUser: JSON.parse(localStorage.getItem('user') || 'null'),
	isLoading: false,
	error: null,
	tokens: JSON.parse(localStorage.getItem('tokens') || 'null'),
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
			const { data: tokens } = await axios.post<AuthToken>(
				`${BASE_URL}/auth/login`,
				{
					email: payload.email,
					password: payload.password,
				}
			)
			const { data: user } = await axios.get<User>(`${BASE_URL}/auth/profile`, {
				headers: {
					Authorization: `Bearer ${tokens.access_token}`,
				},
			})

			return { user, tokens }
		} catch (err) {
			console.log(err)
			return thunkAPI.rejectWithValue('Invalid email or password')
		}
	}
)

export const refreshTokens = createAsyncThunk(
	'auth/refresh-token',
	async (refreshToken: string, thunkAPI) => {
		try {
			const { data: tokens } = await axios.post<AuthToken>(
				`${BASE_URL}/auth/refresh-token`,
				{
					refreshToken: refreshToken,
				}
			)
			return tokens
		} catch (err) {
			console.log(err)
			return thunkAPI.rejectWithValue('Invalid refresh token')
		}
	}
)

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (payload: User, thunkAPI) => {
		try {
			const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload)
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
	reducers: {
		logoutUser: state => {
			state.currentUser = null
			state.tokens = null
			localStorage.removeItem('user')
			localStorage.removeItem('tokens')
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
			(state, action: PayloadAction<{ user: User; tokens: AuthToken }>) => {
				state.currentUser = action.payload.user
				state.tokens = action.payload.tokens
				state.isLoading = false
				state.error = null
				localStorage.setItem('user', JSON.stringify(action.payload.user))
				localStorage.setItem('tokens', JSON.stringify(action.payload.tokens))
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

		builder.addCase(
			refreshTokens.fulfilled,
			(state, action: PayloadAction<AuthToken>) => {
				state.tokens = action.payload
				localStorage.setItem('tokens', JSON.stringify(action.payload))
			}
		)

		builder.addCase(refreshTokens.rejected, state => {
			state.tokens = null
			state.currentUser = null
			localStorage.removeItem('user')
			localStorage.removeItem('tokens')
		})

		builder.addCase(updateUser.fulfilled, (state, action) => {
			state.currentUser = action.payload
			state.isLoading = false
			state.error = null
			localStorage.setItem('user', JSON.stringify(action.payload))
		})
	},
})

export const logoutUser = userSlice.actions.logoutUser
export default userSlice.reducer
