import noImage from '@assets/noImage.webp'
import cross from '@assets/cross.svg'
import { Button } from '@shared/Button/Button'
import { NavLink } from 'react-router-dom'
import { FavoritesItem } from '@features/favorites/favoritesSlice'
import s from './FavoritesItems.module.css'

interface FavoritesItemsProps {
	item: FavoritesItem
	inCart: boolean
	handleRemove: (id: number, size: number) => void
	handleAddToCart: (item: FavoritesItem, quantity: number) => void
}

export const FavoritesItems = ({
	item,
	inCart,
	handleRemove,
	handleAddToCart,
}: FavoritesItemsProps) => {
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

					{inCart ? (
						<NavLink to={'/shoppingCart'}>
							<button className={s.inCart}>In Cart</button>
						</NavLink>
					) : (
						<Button
							onClick={() => handleAddToCart(item, 1)}
							className={s.button}
						>
							Add to Cart
						</Button>
					)}

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
