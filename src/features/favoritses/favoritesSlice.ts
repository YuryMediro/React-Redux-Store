import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProductsType } from '../products/productsSlice'

export interface FavoritesItem {
	size: number
	product: ProductsType
}

interface FavoritesState {
	favorites: FavoritesItem[]
}

const initialState: FavoritesState = {
	favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
}

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addToFavorites: (state, action: PayloadAction<FavoritesItem>) => {
			const existingItem = state.favorites.find(
				item =>
					item.product.id === action.payload.product.id &&
					item.size === action.payload.size
			)
			if (!existingItem) {
				state.favorites.push(action.payload)
				localStorage.setItem('favorites', JSON.stringify(state.favorites))
			}
		},
		removeFromFavorites: (
			state,
			action: PayloadAction<{ id: number; size: number }>
		) => {
			state.favorites = state.favorites.filter(
				item =>
					item.product.id !== action.payload.id ||
					item.size !== action.payload.size
			)
			localStorage.setItem('favorites', JSON.stringify(state.favorites))
		},
		clearFavorites: state => {
			state.favorites = []
			localStorage.removeItem('favorites')
		},
	},
})

export const { addToFavorites, removeFromFavorites, clearFavorites } =
	favoritesSlice.actions
export default favoritesSlice.reducer
