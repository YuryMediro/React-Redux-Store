import * as yup from 'yup'

export const validateUpdateUserSchema = yup.object().shape({
	email: yup.string().email('Invalid mail format').required('Required field'),
	name: yup
		.string()
		.required('Required field')
		.max(15, 'The name must not be more than 15 characters long'),
	avatar: yup.string().url('Invalid URL').required('Required field'),
	password: yup
		.string()
		.min(8, 'The password must contain at least 8 characters')
		.max(20, 'The password must not be more than 20 characters long')
		.nullable()
		.transform(value => value || null),
})
