import React, { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { updateEmail, updateUsername } from '../../services/api'

interface IProfileData {
	isOpenModalAndData: any
	closeModal: Function
	_id: string
	email: string
	username: string
	password: string
}
type createThought = {
	email?: string
	username?: string
}

const ModalChangeProfile: FC<IProfileData> = ({
	isOpenModalAndData,
	closeModal,
	_id,
	password,
}) => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<createThought>()

	const [passwordValue, setPasswordValue] = useState('')

	const dataUser: any = {
		textTitle: isOpenModalAndData.email ? 'email' : 'username',
	}

	const onSubmit: SubmitHandler<createThought> = data => {
		if (passwordValue === password) {
			isOpenModalAndData.email
				? updateEmail(_id, data.email)
				: updateUsername(_id, data.username)
		} else {
			alert('You entered the wrong password')
			return
		}
		alert('You changed the data, reload the page')
		reset()
		closeModal()
	}

	return (
		<>
			<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
				<div
					className='relative w-auto my-6 mx-auto max-w-3xl'
					style={{ minWidth: '445px' }}
				>
					{/*content*/}
					<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 outline-none focus:outline-none'>
						{/*header*/}
						<div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
							<h3 className='text-3xl font-semibold'>My profile</h3>
							<button className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'>
								<span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'></span>
							</button>
						</div>
						{/*body*/}
						<form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
							<div className='text-xl text-black mt-5 ml-2 mb-4'>
								Enter new {dataUser.textTitle}
							</div>
							<input
								style={{ minHeight: '60px' }}
								className='placeholder:text-black border-y border-gray-800  p-2 pl-3 bg-gray-200 text-black'
								placeholder={`New ${dataUser.textTitle}`}
								{...register(dataUser.textTitle, {
									pattern: isOpenModalAndData.email
										? /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
										: /^[a-zA-Z1-9]+$/,
								})}
							/>
							{errors.username && errors.username.type === 'pattern' && (
								<span className='text-red-600'>
									username from 5 to 16 characters,
									<br />
									must contain only letters and numbers,
									<br /> the first character must be alphabetic
								</span>
							)}
							{errors.email && errors.email.type === 'pattern' && (
								<span className='text-red-600'>
									Please enter a valid email address
								</span>
							)}
							<div className='text-xl text-black mt-5 ml-2 mb-4'>
								Enter your password
							</div>
							<input
								style={{ minHeight: '60px' }}
								className='placeholder:text-black border-y border-gray-800  p-2 pl-3 bg-gray-200  text-black'
								placeholder='Password'
								type='password'
								onChange={e => setPasswordValue(e.target.value)}
							/>

							{/*footer*/}
							<div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
								<button
									className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
									onClick={e => closeModal()}
								>
									Cancel
								</button>
								<button
									className='bg-yellow-500 s text-white active:bg-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
									type='submit'
								>
									Change
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
		</>
	)
}

export default ModalChangeProfile
