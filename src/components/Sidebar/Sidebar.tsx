import { NavLink } from 'react-router-dom'
import s from './Sidebar.module.css'
import { Category } from '../../utils/types/categoryType'
import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import clsx from 'clsx'

interface SidebarProps {
	categories: Category[]
	isLoading?: boolean
}

export const Sidebar = ({ categories }: SidebarProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	return (
		<>
			<div className={s.burgerMenu}>
				<button
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className={s.burgerButton}
				>
					<GiHamburgerMenu />
				</button>
			</div>
			<aside className={clsx(s.sidebar, { [s.open]: isMenuOpen })}>
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
