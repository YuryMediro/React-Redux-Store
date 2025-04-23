import * as yup from 'yup'

const regExpEmail = new RegExp(/^\S+@\S+\.\S+$/)

export const validateRegSchema = yup.object().shape({
	email: yup
		.string()
		.trim()
		.required('Required field')
		.matches(regExpEmail, 'Invalid mail format'),
	password: yup
		.string()
		.trim()
		.required('Required field')
		.min(8, 'The password must contain at least 8 characters')
		.max(20, 'The password must not be more than 20 characters long'),
	name: yup.string().trim().required('Required field'),
})
