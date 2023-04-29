import React, { FC } from 'react'
import { deleteFriendById } from '../../services/api'

interface IAllFriendsAndDelete {
	friends: Array<any>
	friendId: string
	setFriends: Function
	closeModal: Function
	setIsFriendExist?: Function
}
const ModalDeleteFriends: FC<IAllFriendsAndDelete> = ({
	friends,
	setFriends,
	friendId,
	closeModal,
	setIsFriendExist,
}) => {
	const userId = localStorage.getItem('USERID') as any

	const deleteFriend = async (friendId: string) => {
		await deleteFriendById(userId, friendId)
		if (setIsFriendExist != undefined) {
			setIsFriendExist(false)
		}
		setFriends(friends.filter(item => item._id !== friendId))
	}

	return (
		<>
			<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
				<div className='relative w-auto my-6 mx-auto max-w-3xl'>
					{/*content*/}
					<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
						{/*header*/}
						<div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
							<h3 className='text-3xl font-semibold'>Delete friend</h3>
							<button className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'>
								<span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
									×
								</span>
							</button>
						</div>
						{/*body*/}
						<div className='relative p-6 flex-auto'>
							<p className='my-4 text-black text-lg leading-relaxed'>
								Are you sure you want to delete your friend?
							</p>
						</div>
						{/*footer*/}
						<div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
							<button
								className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
								onClick={e => closeModal()}
							>
								Cancel
							</button>
							<button
								className='bg-yellow-500  text-white active:bg-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
								onClick={(e: object) => {
									deleteFriend(friendId)
									closeModal()
								}}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
		</>
	)
}

export default ModalDeleteFriends
