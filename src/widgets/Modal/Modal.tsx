import { HTMLAttributes } from 'react'
import s from './Modal.module.css'
import cross from '../../assets/cross.svg'

interface ModalProps extends HTMLAttributes<HTMLButtonElement> {
	title: string
	visible: boolean
	setVisible: (visible: boolean) => void
}

export const Modal = ({ title, visible, setVisible, children }: ModalProps) => {
	const handleOnClick = () => {
		setVisible(false)
	}

	return (
		<>
			{visible && (
				<div className={s.modal_wrapper}>
					<div className={s.modal_content}>
						<div className={s.modal_header}>
							<p className={s.modal_title}>{title}</p>
							<img
								src={cross}
								className={s.modal_close}
								onClick={handleOnClick}
							/>
						</div>
						{children}
					</div>
				</div>
			)}
		</>
	)
}
