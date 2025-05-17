import { NavLink } from 'react-router-dom'
import s from './Sidebar.module.css'
import { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import clsx from 'clsx'
import { Category } from '@utils/types/categoryType'

interface SidebarProps {
	categories: Category[]
	isLoading?: boolean
}

export const Sidebar = ({ categories }: SidebarProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	useEffect(() => {
		const closeMenu = () => setIsMenuOpen(false)

		if (isMenuOpen) {
			window.addEventListener('click', closeMenu)
		}
		return () => document.removeEventListener('click', closeMenu)
	}, [isMenuOpen])

	return (
		<>
			<div className={s.burgerMenu}>
				<button
					onClick={e => {
						e.stopPropagation() // блокируем всплытие клика
						setIsMenuOpen(!isMenuOpen)
					}}
					className={s.burgerButton}
				>
					<GiHamburgerMenu />
				</button>
			</div>
			<aside
				onClick={e => {
					e.stopPropagation() // блокируем закрытие при клике внутри меню 
				}}
				className={clsx(s.sidebar, { [s.open]: isMenuOpen })}
			>
				<div className={s.title}>CATEGORIES</div>

				{categories.length === 0 ? (
					<div className={s.emptyMessage}>No categories available </div>
				) : (
					<nav className={s.nav}>
						<ul className={s.menu}>
							{categories.slice(0, 5).map(category => (
								<li key={category.id}>
									<NavLink
										onClick={() => setIsMenuOpen(false)}
										className={s.item}
										to={`/category/${category.id}`}
									>
										{category.name}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>
				)}

				<div className={s.footer}>
					<a href='#' target='_blank'>
						Help
					</a>
					<a href='#' target='_blank'>
						Terms & Conditions
					</a>
				</div>
			</aside>
		</>
	)
}
