import { NavLink } from 'react-router-dom'
import s from './Sidebar.module.css'
import { Category } from '../../types/categoryType'

interface SidebarProps {
	categories: Category[]
	isLoading?: boolean
}

export const Sidebar = ({ categories }: SidebarProps) => {
	return (
		<aside className={s.sidebar}>
			<div className={s.title}>CATEGORIES</div>
			<nav className={s.nav}>
				<ul className={s.menu}>
					{categories.slice(0, 4).map(category => (
						<li key={category.id}>
							<NavLink className={s.item} to={`/category/${category.id}`}>
								{category.name}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
			<div className={s.footer}>
				<a href='#' target='_blank'>
					Help
				</a>
				<a href='#' target='_blank'>
					Terms & Conditions
				</a>
			</div>
		</aside>
	)
}
