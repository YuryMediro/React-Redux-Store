import clsx from 'clsx'
import s from './RegistrationForm.module.css'
import { FaUser, FaLock, FaEye } from 'react-icons/fa'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateRegSchema } from '../../../utils/validate/validateRegSchema'
import { formRegValues } from '../../../utils/types/formRegValues'
import { Button } from '../../../shared/Button/Button'
import { usePasswordVisible } from '../../../hooks/usePasswordVisible'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { createUser } from '../../../features/user/userSlice'
interface RegistrationFormProps {
	toggleForm: () => void
	onSuccess?: () => void
}

export const RegistrationForm = ({
	toggleForm,
	onSuccess,
}: RegistrationFormProps) => {
	const dispatch = useAppDispatch()
	const { isLoading, error } = useAppSelector(state => state.user)
	const passwordVisible = usePasswordVisible(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<formRegValues>({
		mode: 'onBlur',
		resolver: yupResolver(validateRegSchema),
	})

	const onSubmit: SubmitHandler<formRegValues> = async data => {
		try {
			await dispatch(
				createUser({
					email: data.email,
					password: data.password,
					name: data.name,
					role: 'customer',
					avatar: 'https://cdn-icons-png.flaticon.com/512/6388/6388000.png',
				})
			).unwrap() // unwrap() для корректной обработки ошибок
			reset()
			onSuccess?.()
		} catch (err) {
			console.error('Registration failed:', err)
		}
	}

	return (
		<section className={s.registrationFormContainer}>
			<form className={s.registrationForm} onSubmit={handleSubmit(onSubmit)}>
				<div className={s.inputContainer}>
					<div className={clsx(s.input, { [s.error]: errors.email })}>
						<MdOutlineAlternateEmail className={s.icon} />
						<input
							className={clsx(s.inputFields, {
								[s.error]: errors.email,
							})}
							type='email'
							placeholder='Email'
							id='email'
							{...register('email')}
						/>
					</div>
					{errors.email && (
						<p className={s.error_message}>{errors.email.message}</p>
					)}
				</div>
				<div className={s.inputContainer}>
					<div className={clsx(s.input, { [s.error]: errors.password })}>
						<FaLock className={s.icon} />
						<input
							className={clsx(s.inputFields, {
								[s.error]: errors.password,
							})}
							type={passwordVisible.visible ? 'text' : 'password'}
							placeholder='Password'
							id='password'
							{...register('password')}
						/>
						<FaEye
							className={s.eyeIcon}
							onClick={passwordVisible.handleOnClick}
						/>
					</div>
					{errors.password && (
						<p className={s.error_message}>{errors.password.message}</p>
					)}
				</div>
				<div className={s.inputContainer}>
					<div className={clsx(s.input, { [s.error]: errors.name })}>
						<FaUser className={s.icon} />
						<input
							className={clsx(s.inputFields, {
								[s.error]: errors.name,
							})}
							type='name'
							placeholder='Username'
							id='name'
							{...register('name')}
						/>
					</div>
					{errors.name && (
						<p className={s.error_message}>{errors.name.message}</p>
					)}
				</div>
				<p onClick={toggleForm} className={s.alreadyHaveAccount}>
					I already have an account
				</p>

				{error && <p className={s.error_message}>{error}</p>}

				<div className={s.buttonContainer}>
					<Button
						className={s.submitButton}
						type='submit'
						disabled={!isValid || isLoading}
					>
						{isLoading ? 'Loading...' : ' Create an account'}
					</Button>
				</div>
			</form>
		</section>
	)
}
