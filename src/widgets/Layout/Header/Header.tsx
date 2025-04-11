import { Link } from 'react-router-dom'
import s from './Header.module.css'
import logo from '../../../assets/logo.svg'
import avatar from '../../../assets/avatar.svg'
import search from '../../../assets/search.svg'
import likes from '../../../assets/likes.svg'
import bag from '../../../assets/bag.svg'
import { createPortal } from 'react-dom'
import { UserRegistration } from '../../../processes/UserRegistration/UserRegistration'
import { useFormModal } from '../../../hooks/useFormModal'

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
	const modalRegistration = useFormModal(false)
	return (
		<section className={s.header}>
			<div className={s.logo}>
				<Link to={'/'} className={s.logoLink}>
					<img src={logo} alt='STORE' />
					<div className={s.logoText}>TORE</div>
				</Link>
			</div>

			<button onClick={modalRegistration.handleOnClick} className={s.user}>
				<img className={s.avatar} src={avatar} alt='' />
				<div className={s.userName}>GUESt</div>
			</button>
			{createPortal(
				<UserRegistration
					visible={modalRegistration.visible}
					setVisible={modalRegistration.handleOnClick}
				/>,
				document.body
			)}

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
				<img className={s.icon} src={likes} alt='' />
				<img className={s.icon} src={bag} alt='' />
			</div>
		</section>
	)
}
