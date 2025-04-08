import s from './Poster.module.css'
import computer from '../../assets/computer.svg'
interface PosterProps {}

export const Poster = ({}: PosterProps) => {
	return (
		<section className={s.poster}>
			<p className={s.title}>BIG SALE 20%</p>
			<div className={s.product}>
				<div className={s.textContainer}>
					<p className={s.subtitle}>the bestseller of 2022</p>
					<h1 className={s.text}>
						LENNON r2d2 <br />
						with NVIDIA 5090 TI
					</h1>
					<button className={s.button}>Shop Now</button>
				</div>
				<div className={s.imgContainer}>
					<img className={s.img} src={computer} alt='' />
				</div>
			</div>
		</section>
	)
}
