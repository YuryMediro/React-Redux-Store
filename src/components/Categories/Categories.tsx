import { Link } from 'react-router-dom'
import { Category } from '../../utils/types/categoryType'
import s from './Categories.module.css'
interface CategoriesProps {
	categories: Category[]
	title: string
}

export const Categories = ({ title, categories }: CategoriesProps) => {
	return (
		<section className={s.categories}>
			{title && <h2 className={s.title}>{title}</h2>}
			<div className={s.cardContainer}>
				{categories.slice(0, 5).map(category => (
					<Link
						className={s.card}
						to={`/category/${category.id}`}
						key={category.id}
					>
						<div className={s.itemContainer}>
							<img className={s.img} src={category.image} alt={category.name} />
							<p className={s.name}>{category.name}</p>
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}
