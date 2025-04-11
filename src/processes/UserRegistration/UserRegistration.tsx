import { Link } from 'react-router-dom'
import { Modal } from '../../widgets/Modal/Modal'
import { RegistrationForm } from '../Form/RegistrationForm/RegistrationForm'
import s from './UserRegistration.module.css'
import { Button } from '../../shared/Button/Button'

interface UserRegistrationProps {
	visible: boolean
	setVisible: (visible: boolean) => void
}

export const UserRegistration = ({
	visible,
	setVisible,
}: UserRegistrationProps) => {
	return (
		<Modal title={'Register'} visible={visible} setVisible={setVisible}>
			<RegistrationForm />
			<div className={s.registerContainer}>
				<p className={s.registerText}>Already have an account?</p>
				<Link to={'/'}>
					<Button className={s.button} type='button'>
						Sign in
					</Button>
				</Link>
			</div>
		</Modal>
	)
}
