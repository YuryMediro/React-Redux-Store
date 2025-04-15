import clsx from 'clsx'
import s from './Profile.module.css'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { FaEye, FaLock, FaUser } from 'react-icons/fa'
import { RxAvatar } from 'react-icons/rx'
import { Button } from '../../shared/Button/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { usePasswordVisible } from '../../hooks/usePasswordVisible'
import { User, updateUser } from '../../features/user/userSlice'
import { validateUpdateUserSchema } from '../../utils/validate/ValidateUpdateUserSchema'

export const Profile = () => {
	const dispatch = useAppDispatch()
	const { currentUser, isLoading, error } = useAppSelector(state => state.user)
	const passwordVisible = usePasswordVisible(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(validateUpdateUserSchema),
		defaultValues: {
			email: currentUser?.email || '',
			name: currentUser?.name || '',
			avatar: currentUser?.avatar || '',
		},
	})
	const onSubmit: SubmitHandler<
		typeof validateUpdateUserSchema.__outputType
	> = async data => {
		if (currentUser) {
			// Создаем объект только с измененными полями
			const updateData: Partial<User> = {
				name: data.name,
				email: data.email,
				avatar: data.avatar,
			}

			// Добавляем пароль только если он был введен
			if (data.password) {
				updateData.password = data.password
			}

			// Создаем обновленного пользователя
			const updatedUser = {
				...currentUser,
				...updateData,
			}

			dispatch(updateUser(updatedUser))
		}
	}
	return (
		<section className={s.profile}>
			<p className={s.title}>Profile</p>
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
				<div className={s.inputContainer}>
					<div className={clsx(s.input, { [s.error]: errors.avatar })}>
						<RxAvatar className={s.icon} />
						<input
							className={clsx(s.inputFields, {
								[s.error]: errors.avatar,
							})}
							type='avatar'
							placeholder='The link to your avatar'
							id='avatar'
							{...register('avatar')}
						/>
					</div>
					{errors.avatar && (
						<p className={s.error_message}>{errors.avatar.message}</p>
					)}
				</div>

				{error && <p className={s.error_message}>{error}</p>}

				<div className={s.buttonContainer}>
					<Button
						className={s.submitButton}
						type='submit'
						disabled={!isValid || isLoading}
					>
						{isLoading ? 'Updating...' : 'Update Info'}
					</Button>
				</div>
			</form>
		</section>
	)
}
