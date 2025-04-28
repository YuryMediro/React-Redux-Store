import { Link } from 'react-router-dom'
import s from './Categories.module.css'
import noImage from '@assets/noImage.webp'
import { Category } from '@utils/types/categoryType'
interface CategoriesProps {
	categories: Category[]
	title: string
}

export const Categories = ({ title, categories }: CategoriesProps) => {
	if (categories.length === 0) {
		return (
			<section className={s.categories}>
				{title && <h2 className={s.title}>{title}</h2>}
				<div className={s.emptyMessage}>No categories available </div>
			</section>
		)
	}
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
							<img
								className={s.img}
								src={category.image || noImage}
								alt={category.name}
								onError={e => {
									const target = e.target as HTMLImageElement
									target.src = noImage
								}}
							/>
							<p className={s.name}>{category.name}</p>
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}
