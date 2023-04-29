import React, { FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '../../hooks/hooks'
import { registerUserPost } from '../../redux/slice/registerSlice'

type FormValues = {
	username: string
	email: string
	password: string
}

interface registerForm {
	isFormSubmitted: boolean
	setIFormsSubmitted: Function
}

const RegisterForm: FC<registerForm> = ({
	isFormSubmitted,
	setIFormsSubmitted,
}) => {
	const {
		register,
		handleSubmit,
		watch,
		getValues,
		formState: { errors, isSubmitted },
	} = useForm<FormValues>()

	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<FormValues> = data => {
		setIFormsSubmitted(true)
		dispatch(registerUserPost(data))
	}

	return (
		<form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
			<input
				placeholder='username'
				className='placeholder:text-white mt-8 p-2 bg-black border-b-2 border-gray-600 text-white'
				{...register('username', {
					required: true,
					minLength: 5,
					maxLength: 16,
					pattern: /^[a-zA-Z1-9]+$/,
				})}
			/>
			{errors.username && errors.username.type === 'minLength' && (
				<span className='text-red-600'>
					username must contain at least 5 characters
				</span>
			)}
			{errors.username && errors.username.type === 'maxLength' && (
				<span className='text-red-600'>
					username must not contain more than 16 characters
				</span>
			)}
			{errors.username && errors.username.type === 'required' && (
				<span className='text-red-600'>username must be required</span>
			)}
			{errors.username && errors.username.type === 'pattern' && (
				<span className='text-red-600'>
					username from 5 to 16 characters,
					<br />
					must contain only letters and numbers,
					<br /> the first character must be alphabetic
				</span>
			)}
			<input
				placeholder='Email'
				className='placeholder:text-white mt-8 p-2 bg-black border-b-2 border-gray-600 text-white'
				{...register('email', {
					required: true,
					pattern:
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				})}
			/>
			{errors.email && errors.email.type === 'required' && (
				<span className='text-red-600'>Email must be required</span>
			)}
			{errors.email && errors.email.type === 'pattern' && (
				<span className='text-red-600'>Please enter a valid email address</span>
			)}
			<input
				placeholder='Password'
				className='placeholder:text-white mt-8 p-2 bg-black border-b-2 border-gray-600 text-white'
				type='password'
				{...register('password', {
					required: true,
					maxLength: 16,
					minLength: 8,
					pattern: /(?=.*[a-z])/,
				})}
			/>
			{errors.password && errors.password.type === 'required' && (
				<span className='text-red-600 '>Password must be required</span>
			)}
			{errors.password && errors.password.type === 'pattern' && (
				<span className='text-red-600 '>
					Password must contain only letters
				</span>
			)}
			{errors.password && errors.password.type === 'maxLength' && (
				<span className='text-red-600'>
					Password must not contain more than 16 characters
				</span>
			)}
			{errors.password && errors.password.type === 'minLength' && (
				<span className='text-red-600'>
					Password must contain at least 8 characters
				</span>
			)}
			<button className=' mt-10 bg-yellow-500 rounded-lg h-16 text-black font-bold'>
				CONTINUE
			</button>
		</form>
	)
}

export default RegisterForm
