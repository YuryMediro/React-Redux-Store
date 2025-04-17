import { useState } from 'react'
import { Modal } from '../../widgets/Modal/Modal'
import { LoginForm } from './LoginForm/LoginForm'
import { RegistrationForm } from './RegistrationForm/RegistrationForm'

interface UserRegistrationProps {
	visible: boolean
	setVisible: (visible: boolean) => void
	onSuccess: () => void
}

export const UserRegistration = ({
	visible,
	setVisible,
	onSuccess,
}: UserRegistrationProps) => {
	const [isLogin, setIsLogin] = useState(false)

	const handleSuccess = () => {
		setVisible(false)
		onSuccess?.()
	}

	return (
		<Modal
			title={isLogin ? 'Sign In' : 'Sign Up'}
			visible={visible}
			setVisible={setVisible}
		>
			{isLogin ? (
				<LoginForm
					toggleForm={() => setIsLogin(false)}
					onSuccess={handleSuccess}
				/>
			) : (
				<RegistrationForm
					toggleForm={() => setIsLogin(true)}
					onSuccess={handleSuccess}
				/>
			)}
		</Modal>
	)
}
