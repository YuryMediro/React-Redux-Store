import s from './Notification.module.css'
interface NotificationProps {
	message: string
}

export const Notification = ({ message }: NotificationProps) => {
	return message ? (
		<div className={s.notification}>
			<span>{message}</span>
		</div>
	) : null
}
