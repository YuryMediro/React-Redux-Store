import { useState } from 'react'
import { Modal } from '../../widgets/Modal/Modal'
import { LoginForm } from '../Form/LoginForm/LoginForm'
import { RegistrationForm } from '../Form/RegistrationForm/RegistrationForm'

interface UserRegistrationProps {
	visible: boolean
	setVisible: (visible: boolean) => void
}

export const UserRegistration = ({
	visible,
	setVisible,
}: UserRegistrationProps) => {
	const [isLogin, setIsLogin] = useState(false)

	return (
		<Modal
			title={isLogin ? 'Sign In' : 'Sign Up'}
			visible={visible}
			setVisible={setVisible}
		>
			{isLogin ? (
				<LoginForm toggleForm={() => setIsLogin(false)} />
			) : (
				<RegistrationForm toggleForm={() => setIsLogin(true)} />
			)}
		</Modal>
	)
}
