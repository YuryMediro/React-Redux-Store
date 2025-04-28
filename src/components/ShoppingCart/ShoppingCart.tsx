import s from './ShoppingCart.module.css'
import { Button } from '@shared/Button/Button'
import { Notification } from '@widgets/Notification/Notification'
import { useShoppingCartLogic } from '@hooks/useShoppingCartLogic'
import { ShoppingCartItems } from './ShoppingCartItems'

export const ShoppingCart = () => {
	const {
		items,
		handleRemove,
		handleQuantityChange,
		handleClearCart,
		notification,
		totalPrice,
	} = useShoppingCartLogic()
	return (
		<>
			<Notification message={notification} />
			<section className={s.wrapper}>
				<section className={s.header}>
					<h2 className={s.title}>Your cart</h2>
					{items.length > 0 && (
						<Button className={s.buttonClearCart} onClick={handleClearCart}>
							Clear cart
						</Button>
					)}
				</section>
				{items.length === 0 ? (
					<div className={s.emptyCart}>Your cart is empty</div>
				) : (
					<>
						<section className={s.items}>
							{items.map(item => {
								return (
									<ShoppingCartItems
										key={`${item.id}-${item.size}`}
										item={item}
										handleRemove={handleRemove}
										handleQuantityChange={handleQuantityChange}
									/>
								)
							})}
						</section>
					</>
				)}
				<section className={s.footer}>
					<p className={s.total}>
						TOTAL PRICE: <span>{totalPrice.toFixed(2)}$</span>
					</p>
					{items.length > 0 && (
						<Button className={s.button}>Proceed to checkout</Button>
					)}
				</section>
			</section>
		</>
	)
}
