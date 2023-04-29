import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import ModalDeleteFriends from './ModalDeleteFriends'
import { TailSpin } from 'react-loader-spinner'

interface IAllFriends {
	friends: Array<any>
	setFriends: Function
	isLoading: boolean
	isFriendExist?: boolean
	setIsFriendExist?: Function
}

const WallFriends: FC<IAllFriends> = ({
	friends,
	setFriends,
	isLoading,
	isFriendExist,
	setIsFriendExist,
}) => {
	const [isModal, setIsModal] = useState(false)

	const openModal = () => {
		setIsModal(true)
	}
	const closeModal = () => {
		setIsModal(false)
	}

	return (
		<>
			{isLoading && (
				<div className='flex justify-center mt-8'>
					<TailSpin
						height='80'
						width='80'
						color='#FFB800'
						ariaLabel='tail-spin-loading'
						radius='1'
						wrapperStyle={{}}
						wrapperClass=''
						visible={true}
					/>
				</div>
			)}
			(
			{friends.map(friend => {
				return (
					<div key={friend._id}>
						{isModal && (
							<ModalDeleteFriends
								friends={friends}
								setFriends={setFriends}
								friendId={friend._id}
								closeModal={closeModal}
								setIsFriendExist={setIsFriendExist}
							/>
						)}

						<div
							className='flex justify-between items-center border-b border-gray-800 pl-5 pr-10 pt-5'
							style={{ minWidth: '590px' }}
						>
							<div>
								<div className=' text-2xl text-yellow-500 font-medium mb-4'>
									{friend.username}
								</div>
								<div className='text-white mb-5'>
									Has {friend.thoughts.length} posts
								</div>
							</div>
							<div className='flex gap-4'>
								<button
									className='bg-yellow-500 rounded h-10 text-black font-medium px-5'
									onClick={(e: any) => openModal()}
								>
									Delete
								</button>
								<Link to={`/friend/${friend._id}`}>
									<button className='bg-yellow-500 rounded h-10 text-white font-medium px-5'>
										MORE
									</button>
								</Link>
							</div>
						</div>
					</div>
				)
			})}
			{friends.length === 0 && isFriendExist == false ? (
				<div className='flex justify-center mt-4 text-3xl text-yellow-500'>
					You don't have any friends.
				</div>
			) : (
				''
			)}
			)
		</>
	)
}

export default WallFriends
