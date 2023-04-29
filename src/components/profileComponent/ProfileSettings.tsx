import React, { FC, useState, useContext } from 'react'
import { IUser } from '../../types/types'
import ModalChangeProfile from './ModalChangeProfile'
import ModalDeleteProfile from './ModalDeleteProfile'
import { authContext } from '../../context'

const ProfileSettings: FC<IUser> = ({ email, username, _id, password }) => {
	const [isOpenModalAndData, setIsModalAndData] = useState({
		isOpen: false,
		email: false,
		username: false,
	})
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
	const { setIsAuth } = useContext(authContext)

	const leaveProfile = () => {
		setIsAuth(false)
		localStorage.clear()
	}

	const openModal = (data: string) => {
		if (data === 'email') {
			setIsModalAndData({ ...isOpenModalAndData, isOpen: true, email: true })
		} else {
			setIsModalAndData({ ...isOpenModalAndData, isOpen: true, username: true })
		}
	}
	const closeModal = () => {
		setIsModalAndData({
			...isOpenModalAndData,
			isOpen: false,
			username: false,
			email: false,
		})
		setIsOpenDeleteModal(false)
	}

	return (
		<div className='flex flex-col border border-gray-800 mt-4 ml-8 mr-12 pt-2 pl-3 pr-10 pb-3'>
			{isOpenModalAndData.isOpen && (
				<ModalChangeProfile
					closeModal={closeModal}
					isOpenModalAndData={isOpenModalAndData}
					_id={_id}
					email={email}
					username={username}
					password={password}
				/>
			)}
			{isOpenDeleteModal && (
				<ModalDeleteProfile
					closeModal={closeModal}
					password={password}
					_id={_id}
				/>
			)}
			<div className='flex justify-between items-center mb-2'>
				<div className='text-white font-bold text-xl flex align-bottom gap-5'>
					Your email:<div className='text-lg font-normal'>{email}</div>
				</div>
				<button
					className='bg-yellow-500 p-2 font-semibold rounded-md focus:bg-yellow-600 ease-linear transition-all duration-150'
					onClick={e => openModal('email')}
				>
					CHANGE
				</button>
			</div>
			<div
				className=' border-b border-gray-800'
				style={{ minWidth: '516px', marginLeft: '-12px' }}
			></div>
			<div className='flex justify-between items-center mb-2 mt-3'>
				<div className='text-white font-bold text-xl flex align-bottom gap-5'>
					Your username:
					<div className='text-lg font-normal'>{username}</div>
				</div>
				<button
					className='bg-yellow-500 p-2 rounded-md font-semibold focus:bg-yellow-600 ease-linear transition-all duration-150'
					onClick={e => openModal('username')}
				>
					CHANGE
				</button>
			</div>
			<div
				className=' border-b border-gray-800'
				style={{ minWidth: '516px', marginLeft: '-12px' }}
			></div>
			<button
				className='bg-yellow-500 p-2 rounded-md focus:bg-yellow-600 ease-linear transition-all duration-150 mt-5'
				style={{ maxWidth: '195px' }}
				onClick={e => setIsOpenDeleteModal(true)}
			>
				Delete profile
			</button>
			<button
				className='bg-yellow-500 p-2 rounded-md focus:bg-yellow-600 ease-linear transition-all duration-150 mt-5'
				style={{ maxWidth: '195px' }}
				onClick={e => leaveProfile()}
			>
				Leave
			</button>
		</div>
	)
}

export default ProfileSettings
