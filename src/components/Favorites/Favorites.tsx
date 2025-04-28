import s from './Favorites.module.css'
import { Button } from '@shared/Button/Button'
import { Notification } from '@widgets/Notification/Notification'
import { useFavoritesLogic } from '@hooks/useFavoritesLogic'
import { FavoritesItems } from './FavoritesItems'

export const Favorites = () => {
	const {
		items,
		handleRemove,
		isInCart,
		handleClearFavorites,
		handleAddToCart,
		notification,
	} = useFavoritesLogic()
	return (
		<>
			<Notification message={notification} />
			<section className={s.wrapper}>
				<section className={s.header}>
					<h2 className={s.title}>Favorite products</h2>
					{items.length > 0 && (
						<Button
							onClick={handleClearFavorites}
							className={s.buttonClearCart}
						>
							Clear favorites
						</Button>
					)}
				</section>

				{items.length === 0 ? (
					<div className={s.emptyCart}>Your favorites is empty</div>
				) : (
					<>
						<section className={s.items}>
							{items.map(item => {
								return (
									<FavoritesItems
										key={`${item.id}-${item.size}`}
										item={item}
										inCart={isInCart(item)}
										handleRemove={handleRemove}
										handleAddToCart={handleAddToCart}
									/>
								)
							})}
						</section>
					</>
				)}
			</section>
		</>
	)
}
