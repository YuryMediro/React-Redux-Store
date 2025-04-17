import { Link, NavLink } from 'react-router-dom'
import s from './Header.module.css'
import logo from '../../../assets/logo.svg'
import avatar from '../../../assets/avatar.svg'
import search from '../../../assets/search.svg'
import likes from '../../../assets/likes.svg'
import bag from '../../../assets/bag.svg'
import { createPortal } from 'react-dom'
import { UserRegistration } from '../../../processes/Form/UserForm'
import { useFormModal } from '../../../hooks/useFormModal'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { logoutUser } from '../../../features/user/userSlice'
import { useState } from 'react'
import { useSearchProductsQuery } from '../../../features/api/apiSlice'
import { useSearchProducts } from '../../../hooks/useSearchProducts'

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
	const modalRegistration = useFormModal(false)
	const { currentUser } = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()

	//Получем все продукты
	const { data: productsData } = useSearchProductsQuery('')
	const products = productsData || []

	//Задаем состояние для поиска
	const [searchQuery, setSearchQuery] = useState('')
	const { filteredProducts } = useSearchProducts({ products, searchQuery })

	const handleLogout = () => {
		dispatch(logoutUser())
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
							<img className={s.avatar} src={avatar} alt='' />
							<div className={s.userName}>GUESt</div>
						</button>
					)}
				</section>
				<section className={s.searchContainer}>
					<form className={s.formContainer}>
						<div className={s.form}>
							<img className={s.iconSearch} src={search} alt='' />
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
					<img className={s.icon} src={likes} alt='' />
					<NavLink to={'/shoppingCart'}>
						<img className={s.icon} src={bag} alt='' />
					</NavLink>
				</section>
			</header>

			{!currentUser &&
				createPortal(
					<UserRegistration
						visible={modalRegistration.visible}
						setVisible={modalRegistration.handleOnClick}
					/>,
					document.body
				)}
		</>
	)
}
