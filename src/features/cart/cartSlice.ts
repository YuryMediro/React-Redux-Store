import { ProductsType } from '@features/products/productsSlice'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CartItem extends ProductsType {
	size: number
	quantity: number 
}

interface CartState {
	items: CartItem[]
}
const initialState: CartState = {
	items: JSON.parse(localStorage.getItem('cart') || '[]'),
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addCart: (state, action: PayloadAction<CartItem>) => {
			const existingItem = state.items.find(
				item =>
					item.id === action.payload.id && item.size === action.payload.size
			)
			if (existingItem) {
				existingItem.quantity += action.payload.quantity
			} else {
				state.items.push(action.payload)
			}
			localStorage.setItem('cart', JSON.stringify(state.items))
		},
		removeFromCart: (
			state,
			action: PayloadAction<{ id: number; size: number }>
		) => {
			state.items = state.items.filter(
				item =>
					item.id !== action.payload.id || item.size !== action.payload.size
			)
			localStorage.setItem('cart', JSON.stringify(state.items))
		},
		updateQuantity: (
			state,
			action: PayloadAction<{ id: number; size: number; quantity: number }>
		) => {
			const item = state.items.find(
				item =>
					item.id === action.payload.id && item.size === action.payload.size
			)
			if (item) {
				item.quantity = action.payload.quantity
			}
			localStorage.setItem('cart', JSON.stringify(state.items))
		},
		clearCart: state => {
			state.items = []
			localStorage.removeItem('cart')
		},
	},
})

export const { addCart, removeFromCart, updateQuantity, clearCart } =
	cartSlice.actions
export default cartSlice.reducer
