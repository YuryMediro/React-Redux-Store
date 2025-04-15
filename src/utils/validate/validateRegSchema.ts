import * as yup from 'yup'

const regExpEmail = new RegExp(/^\S+@\S+\.\S+$/)

export const validateRegSchema = yup.object().shape({
	email: yup
		.string()
		.trim()
		.required('Обязательное поле')
		.matches(regExpEmail, 'Неверный формат почты'),
	password: yup
		.string()
		.trim()
		.required('Обязательное поле')
		.min(8, 'Пароль должен состоять не менее чем из 8 символов')
		.max(20, 'Пароль не должен состоять более чем из 20 символов'),
	name: yup.string().trim().required('Обязательное поле'),
	
})
