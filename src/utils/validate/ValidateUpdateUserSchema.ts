import * as yup from 'yup'

export const validateUpdateUserSchema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Required'),
	name: yup.string().required('Required'),
	avatar: yup.string().url('Invalid URL').required('Required'),
	password: yup
		.string()
		.min(8, 'Пароль должен состоять не менее чем из 8 символов')
		.max(20, 'Пароль не должен состоять более чем из 20 символов')
		.nullable()
		.transform(value => value || null),
})
