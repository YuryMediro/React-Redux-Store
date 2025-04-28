interface FooterProps {}
import { Link } from 'react-router-dom'
import s from './Footer.module.css'
import logo from '@assets/logo.svg'
import { FaInstagram, FaTelegramPlane, FaVk } from 'react-icons/fa'

export const Footer = ({}: FooterProps) => {
	return (
		<section className={s.footer}>
			<div className={s.logo}>
				<Link to={'/'} className={s.logoLink}>
					<img src={logo} alt='STORE' />
					<div className={s.logoText}>TORE</div>
				</Link>
			</div>
			<p className={s.copyright}>
				Developed by
				<a
					href='https://github.com/YuryMediro'
					target='_blank'
					rel='noreferrer'
				>
					Mediro
				</a>
			</p>
			<div className={s.socials}>
				<a href='#' target='_blank' rel='noreferrer'>
					<FaInstagram className={s.socialIcon} />
				</a>
				<a href='#' target='_blank' rel='noreferrer'>
					<FaTelegramPlane className={s.socialIcon} />
				</a>
				<a href='#' target='_blank' rel='noreferrer'>
					<FaVk className={s.socialIcon} />
				</a>
			</div>
		</section>
	)
}
