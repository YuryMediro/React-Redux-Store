import s from './Banner.module.css'
import banner from '../../assets/banner.png'
import sneaker from '../../assets/sneaker.svg'
import console from '../../assets/console.svg'
import { Button } from '../../shared/Button/Button'
export const Banner = () => {
	return (
		<section className={s.banner}>
			<div className={s.leftSide}>
				<p className={s.text}>
					NEW YEAR
					<span>
						<br />
						SALE
					</span>
				</p>
				<Button className={s.button}>See more</Button>
				<img className={s.sneaker} src={sneaker} alt='sneaker' />
				<img className={s.console} src={console} alt='console' />
			</div>
			<div className={s.rightSide}>
				<img className={s.img} src={banner} alt='Banner' />
				<p className={s.discount}>
					save up to <span>50%</span> off
				</p>
			</div>
		</section>
	)
}
