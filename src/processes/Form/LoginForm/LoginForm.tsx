import clsx from 'clsx'
import s from './LoginForm.module.css'
import { FaLock, FaEye } from 'react-icons/fa'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useVisible } from '@hooks/hooks'
import { loginUser } from '@features/user/userSlice'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { Button } from '@shared/Button/Button'
import { formLogValues } from '@utils/types/formLogValues'
import { validateLogSchema } from '@utils/validate/ValidateLogSchema'

interface LoginFormProps {
	toggleForm: () => void
	onSuccess?: () => void
}

export const LoginForm = ({ toggleForm, onSuccess }: LoginFormProps) => {
	const dispatch = useAppDispatch()
	const { isLoading, error } = useAppSelector(state => state.user)
	const passwordVisible = useVisible(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<formLogValues>({
		mode: 'onBlur',
		resolver: yupResolver(validateLogSchema),
	})

	const onSubmit: SubmitHandler<formLogValues> = async data => {
		try {
			await dispatch(
				loginUser({
					email: data.email,
					password: data.password,
				})
			).unwrap()
			reset()
			onSuccess?.()
		} catch (err) {
			console.error('Login failed:', err)
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
				<p onClick={toggleForm} className={s.alreadyHaveAccount}>
					I don't have an account
				</p>

				{error && <p className={s.error_message}>{error}</p>}

				<div className={s.buttonContainer}>
					<Button
						className={s.submitButton}
						type='submit'
						disabled={!isValid || isLoading}
					>
						{isLoading ? 'Loading...' : 'Sign in'}
					</Button>
				</div>
			</form>
		</section>
	)
}
