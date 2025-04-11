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
interface RegistrationFormProps {}

export const RegistrationForm = ({}: RegistrationFormProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<formRegValues>({
		mode: 'onBlur',
		resolver: yupResolver(validateRegSchema),
	})
	const passwordVisible = usePasswordVisible(false)
	const onSubmit: SubmitHandler<formRegValues> = data => {
		console.log({ data })
		reset()
		// Здесь можно добавить логику для отправки данных на сервер
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
				<div className={s.buttonContainer}>
					<Button className={s.submitButton} type='submit' disabled={!isValid}>
						Create an account
					</Button>
				</div>
			</form>
		</section>
	)
}
