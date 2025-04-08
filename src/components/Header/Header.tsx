import { Link } from 'react-router-dom'
import s from './Header.module.css'
import logo from '../../assets/logo.svg'
import avatar from '../../assets/avatar.svg'
import search from '../../assets/search.svg'
import likes from '../../assets/likes.svg'
import bag from '../../assets/bag.svg'
interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
	return (
		<div className={s.header}>
			<div className={s.logo}>
				<Link to={'/'} className={s.logoLink}>
					<img src={logo} alt='STUFF' />
					<div className={s.logoText}>TUFF</div>
				</Link>
			</div>

			<div className={s.user}>
				<img className={s.avatar} src={avatar} alt='' />
				<div className={s.userName}>GUESt</div>
			</div>

			<form className={s.formContainer}>
				<div className={s.form}>
					<img className={s.iconSearch} src={search} alt='' />
					<input
						className={s.input}
						type='searh'
						name='search'
						autoComplete='off'
						placeholder='Search for anything...'
						value=''
					/>
				</div>
			</form>
			<div className={s.iconContainer}>
				<img className={s.iconLikes} src={likes} alt='' />
				<img className={s.iconBag} src={bag} alt='' />
			</div>
		</div>
	)
}
