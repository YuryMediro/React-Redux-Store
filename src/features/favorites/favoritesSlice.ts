import { ProductsType } from '@features/products/productsSlice'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface FavoritesItem extends ProductsType {
	size: number
}

interface FavoritesState {
	items: FavoritesItem[]
}

const initialState: FavoritesState = {
	items: JSON.parse(localStorage.getItem('favorites') || '[]'),
}

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addToFavorites: (state, action: PayloadAction<FavoritesItem>) => {
			const existingItem = state.items.find(
				item =>
					item.id === action.payload.id && item.size === action.payload.size
			)
			if (!existingItem) {
				state.items.push(action.payload)
				localStorage.setItem('favorites', JSON.stringify(state.items))
			}
		},
		removeFromFavorites: (
			state,
			action: PayloadAction<{ id: number; size: number }>
		) => {
			state.items = state.items.filter(
				item =>
					item.id !== action.payload.id || item.size !== action.payload.size
			)
			localStorage.setItem('favorites', JSON.stringify(state.items))
		},
		clearFavorites: state => {
			state.items = []
			localStorage.removeItem('favorites')
		},
	},
})

export const { addToFavorites, removeFromFavorites, clearFavorites } =
	favoritesSlice.actions
export default favoritesSlice.reducer
