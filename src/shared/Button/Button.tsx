import s from './Button.module.css'
import { HTMLAttributes } from 'react'
import clsx from 'clsx'

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
			className={clsx(s.button, className)}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	)
}
