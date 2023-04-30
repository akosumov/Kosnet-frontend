import React, { FC, useState, useEffect, useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { getAllUser } from '../../services/api'
import { authContext } from '../../context'

type FormValues = {
	login: string
	password: string
}

const LoginForm: FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<FormValues>()

	const { isAuth, setIsAuth } = useContext(authContext)
	const [users, setUsers] = useState<any>([])
	const getUsers = async () => {
		const users = await getAllUser()
		setUsers(users)
	}
	const onSubmit: SubmitHandler<FormValues> = data => {
		console.log(users, '<--- все юзеры')
		if (users) {
			let isLogged
			users.forEach((item: any) => {
				if (item.email === data.login) {
					if (item.password === data.password) {
						setIsAuth(true)
						localStorage.setItem('auth', 'true')
						localStorage.setItem(
							'user',
							JSON.stringify({
								username: item.username,
								password: item.password,
								email: item.email,
							})
						)
						localStorage.setItem('USERID', item._id)
						alert('You logged into the account')
						isLogged = true
					}
				}
			})
			if (!isLogged) {
				alert('User not found')
				reset()
			}
		}
	}

	useEffect(() => {
		getUsers()
	}, [])
	return (
		<form className='flex flex-col relative' onSubmit={handleSubmit(onSubmit)}>
			<input
				placeholder='Email'
				className='placeholder:text-white mt-8 p-2 bg-black border-b-2 border-gray-600 text-white'
				{...register('login', {
					required: true,
					pattern:
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				})}
			/>

			{errors.login && (
				<span className='text-red-600'>Password or login is incorrect</span>
			)}

			<input
				placeholder='Password'
				type='password'
				className='placeholder:text-white mt-8  p-2 bg-black border-b-2 border-gray-600 text-white'
				{...register('password', {
					required: true,
					maxLength: 16,
					minLength: 8,
					pattern: /(?=.*[a-z])/,
				})}
			/>
			{errors.password && (
				<span className='text-red-600 '>Password or login is incorrect</span>
			)}
			<button
				className=' mt-10 bg-yellow-500 rounded-lg h-16 text-black font-bold'
				type='submit'
			>
				Login now
			</button>
		</form>
	)
}

export default LoginForm
