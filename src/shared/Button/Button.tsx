import { HTMLAttributes } from 'react'
import s from './Button.module.css'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	type?: 'button' | 'reset' | 'submit'
	className: string
	disabled?: boolean
}

export const Button = ({
	type,
	className,
	children,
	disabled,
	...props
}: ButtonProps) => {
	return (
		<button
			type={type}
			className={`${s.button} ${className}`}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	)
}
