import { FaMinus, FaPlus } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import cross from '@assets/cross.svg'
import noImage from '@assets/noImage.webp'
import s from './ShoppingCartItems.module.css'
import { CartItem } from '@features/cart/cartSlice'

interface ShoppingCartItems {
	item: CartItem
	handleRemove: (id: number, size: number) => void
	handleQuantityChange: (id: number, size: number, quantity: number) => void
}

export const ShoppingCartItems = ({
	item,
	handleRemove,
	handleQuantityChange,
}: ShoppingCartItems) => {
	return (
		<div key={`${item.id}-${item.size}`} className={s.cartItem}>
			<NavLink to={`/products/${item.id}`}>
				<img
					src={item.images[0]}
					alt={item.title}
					className={s.img}
					onError={e => {
						const target = e.target as HTMLImageElement
						target.src = noImage
					}}
				/>
			</NavLink>
			<div className={s.productInfo}>
				<div className={s.description}>
					<p className={s.productName}>{item.title}</p>
					<div className={s.productCategorySize}>
						<p className={s.productCategory}>{item.category.name}</p>
						<p className={s.size}>size: {item.size}</p>
					</div>
				</div>
				<div className={s.priceQuantity}>
					<p className={s.price}>{item.price}$</p>
					<div className={s.quantity}>
						<FaMinus
							className={s.quantityButton}
							onClick={() =>
								handleQuantityChange(item.id, item.size, item.quantity - 1)
							}
						/>
						<span>{item.quantity}</span>
						<FaPlus
							className={s.quantityButton}
							onClick={() =>
								handleQuantityChange(item.id, item.size, item.quantity + 1)
							}
						/>
					</div>
					<div className={s.itemTotalPrice}>{item.price * item.quantity}$</div>
					<button
						onClick={() => handleRemove(item.id, item.size)}
						className={s.remove}
					>
						<img src={cross} alt={'cross'} />
					</button>
				</div>
			</div>
		</div>
	)
}
