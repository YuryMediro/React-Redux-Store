import { Link, NavLink } from 'react-router-dom'
import s from './Header.module.css'
import logo from '@assets/logo.svg'
import avatar from '@assets/avatar.svg'
import search from '@assets/search.svg'
import likes from '@assets/likes.svg'
import bag from '@assets/bag.svg'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import { useSearchProducts, useVisible } from '@hooks/hooks'
import { useSearchProductsQuery } from '@features/api/apiSlice'
import { clearCart } from '@features/cart/cartSlice'
import { clearFavorites } from '@features/favorites/favoritesSlice'
import { logoutUser } from '@features/user/userSlice'
import { useAppSelector, useAppDispatch } from '@hooks/redux'
import { UserRegistration } from '@processes/Form/UserForm'

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
	const modalRegistration = useVisible(false)
	const { currentUser } = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()

	//Получем все продукты
	const { data: productsData } = useSearchProductsQuery('')
	const products = productsData || []

	//Задаем состояние для поиска
	const [searchQuery, setSearchQuery] = useState('')
	const { filteredProducts } = useSearchProducts({ products, searchQuery })

	//отображение количества товара в корзине
	const { items: cartItems } = useAppSelector(state => state.cart)
	const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
	//отображение количества товара в избранных
	const { items: favoritesItems } = useAppSelector(state => state.favorites)
	const favoritesItemsCount = favoritesItems.length

	const handleLogout = () => {
		dispatch(logoutUser())
		dispatch(clearCart())
		dispatch(clearFavorites())
	}

	return (
		<>
			<header className={s.header}>
				<section className={s.logo}>
					<Link to={'/'} className={s.logoLink}>
						<img src={logo} alt='STORE' />
						<div className={s.logoText}>TORE</div>
					</Link>
				</section>

				<section className={s.userContainer}>
					{currentUser ? (
						<div className={s.user}>
							<Link to={'/profile'} className={s.userLink}>
								<img
									className={s.avatar}
									src={currentUser.avatar || avatar}
									alt={currentUser.name}
								/>
								<div className={s.userName}>{currentUser.name}</div>
							</Link>
							<Link to={'/'} className={s.logoutLink}>
								<button onClick={handleLogout} className={s.logoutButton}>
									Logout
								</button>
							</Link>
						</div>
					) : (
						<button
							onClick={modalRegistration.handleOnClick}
							className={s.user}
						>
							<img className={s.avatar} src={avatar} alt='Avatar' />
							<div className={s.userName}>GUESt</div>
						</button>
					)}
				</section>
				<section className={s.searchContainer}>
					<form className={s.formContainer}>
						<div className={s.form}>
							<img className={s.iconSearch} src={search} alt='Search' />
							<input
								className={s.input}
								type='search'
								name='search'
								autoComplete='off'
								placeholder='Search for anything...'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
							/>
						</div>
					</form>
					{searchQuery && searchQuery.length > 2 && (
						<div className={s.searchResults}>
							{filteredProducts.length > 0 ? (
								filteredProducts.map(product => (
									<Link
										key={product.id}
										to={`/products/${product.id}`}
										className={s.searchItem}
									>
										<img
											src={product.images[0]}
											alt={product.title}
											className={s.image}
										/>
										<div className={s.productInfo}>
											<p className={s.productTitle}>{product.title}</p>
											<p className={s.productPrice}>{product.price}$</p>
											<p className={s.productCategory}>
												{product.category.name}
											</p>
										</div>
									</Link>
								))
							) : (
								<p className={s.noResults}>No results</p>
							)}
						</div>
					)}
				</section>

				<section className={s.iconContainer}>
					{currentUser ? (
						<>
							<NavLink to={'/favorites'} className={s.link}>
								<img className={s.icon} src={likes} alt='Favorites' />
								{favoritesItemsCount > 0 && (
									<span className={s.ItemsCount}>{favoritesItemsCount}</span>
								)}
							</NavLink>
							<NavLink to={'/shoppingCart'} className={s.link}>
								<img className={s.icon} src={bag} alt='Cart' />
								{cartItemsCount > 0 && (
									<span className={s.ItemsCount}>{cartItemsCount}</span>
								)}
							</NavLink>
						</>
					) : (
						<>
							<img
								className={s.icon}
								src={likes}
								alt='Favorites'
								onClick={modalRegistration.handleOnClick}
							/>
							<img
								className={s.icon}
								src={bag}
								alt='Cart'
								onClick={modalRegistration.handleOnClick}
							/>
						</>
					)}
				</section>
				<nav className={s.navbarMobile}>
					<section className={s.userContainerMobile}>
						{currentUser ? (
							<div className={s.user}>
								<Link to={'/profile'} className={s.userLink}>
									<img
										className={s.avatar}
										src={currentUser.avatar || avatar}
										alt={currentUser.name}
									/>
									<div className={s.userName}>{currentUser.name}</div>
								</Link>
								<Link to={'/'} className={s.logoutLink}>
									<button onClick={handleLogout} className={s.logoutButton}>
										Logout
									</button>
								</Link>
							</div>
						) : (
							<button
								onClick={modalRegistration.handleOnClick}
								className={s.user}
							>
								<img className={s.avatar} src={avatar} alt='Avatar' />
								<div className={s.userName}>GUEST</div>
							</button>
						)}
					</section>

					<section className={s.iconContainerMobile}>
						{currentUser ? (
							<>
								<NavLink to={'/favorites'} className={s.link}>
									<img className={s.icon} src={likes} alt='Favorites' />
									{favoritesItemsCount > 0 && (
										<span className={s.ItemsCount}>{favoritesItemsCount}</span>
									)}
								</NavLink>
								<NavLink to={'/shoppingCart'} className={s.link}>
									<img className={s.icon} src={bag} alt='Cart' />
									{cartItemsCount > 0 && (
										<span className={s.ItemsCount}>{cartItemsCount}</span>
									)}
								</NavLink>
							</>
						) : (
							<>
								<img
									className={s.icon}
									src={likes}
									alt='Favorites'
									onClick={modalRegistration.handleOnClick}
								/>
								<img
									className={s.icon}
									src={bag}
									alt='Cart'
									onClick={modalRegistration.handleOnClick}
								/>
							</>
						)}
					</section>
				</nav>
			</header>

			{!currentUser &&
				createPortal(
					<UserRegistration
						visible={modalRegistration.visible}
						setVisible={modalRegistration.handleOnClick}
						onSuccess={() => modalRegistration.handleOnClick()}
					/>,
					document.body
				)}
		</>
	)
}
