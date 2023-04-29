import React, { FC, useState, useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { deleteUser } from '../../services/api'
import { authContext } from '../../context'

interface IProfileData {
	closeModal: Function
	password: string
	_id: string
}

const ModalDeleteProfile: FC<IProfileData> = ({
	closeModal,
	password,
	_id,
}) => {
	const [passwordValue, setPasswordValue] = useState('')
	const { setIsAuth } = useContext(authContext)

	const deleteUserAndData = (e: any) => {
		if (passwordValue === password) {
			alert('You have successfully deleted your account ')
			deleteUser(_id)
			setIsAuth(false)
		} else {
			alert('You entered the wrong password')
		}
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
						<div className='mt-3 ml-2 text-red-600  text-xl font-semibold'>
							Are you sure you want to delete your profile ?
						</div>
						<form className='flex flex-col'>
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
									onClick={e => {
										deleteUserAndData(e)
									}}
								>
									Delete
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

export default ModalDeleteProfile
