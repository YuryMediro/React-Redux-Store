import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import cartSlice from './cart/cartSlice'
import categoriesSlice from './categories/categoriesSlice'
import favoritesSlice from './favorites/favoritesSlice'
import productsSlice from './products/productsSlice'
import userSlice from './user/userSlice'
export const store = configureStore({
	reducer: {
		categories: categoriesSlice,
		products: productsSlice,
		[apiSlice.reducerPath]: apiSlice.reducer,
		user: userSlice,
		cart: cartSlice,
		favorites: favoritesSlice,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
