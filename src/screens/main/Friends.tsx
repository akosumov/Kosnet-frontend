import React, { FC, useState, useEffect } from 'react'
import NavigationMenu from '../../components/navigateMenu/NavigationMenu'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import WallFriends from '../../components/friendsComponent/WallFriends'
import { findUserById } from '../../services/api'
import AddFriend from '../../components/friendsComponent/AddFriend'
import { useNavigate } from 'react-router-dom'
const Friends: FC = () => {
	const navigate = useNavigate()
	const userId = localStorage.getItem('USERID') as any
	const [friends, setFriends] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [isFriendExist, setIsFriendExist] = useState<boolean | undefined>()

	const friendsId = async (userId: string) => {
		const user = await findUserById(userId)
		if (!user.friends.length) {
			setIsFriendExist(false)
		} else {
			setIsFriendExist(true)
			setFriends(user.friends)
		}
	}

	useEffect(() => {
		friendsId(userId)
		setIsLoading(false)
	}, [setFriends])

	return (
		<div className='flex justify-center bg-black min-h-screen pt-5 gap-20'>
			<NavigationMenu />
			<div
				className='flex flex-col border-x border-gray-800'
				style={{ marginTop: '-20px', minWidth: '600px', maxWidth: '600px' }}
			>
				<div className='flex items-center gap-6 pt-5 px-6 mb-10'>
					<div
						onClick={e => {
							navigate(-1)
						}}
					>
						<AiOutlineArrowLeft size={25} color='#ffb000' />
					</div>

					<div className='text-3xl text-white flex gap-2'>Your friends</div>
				</div>

				<div className=' border-b border-gray-800'>
					<div className='text-amber-400 font-bold text-base font-mono pl-8 mb-4'>
						Friends
					</div>
					<div
						style={{
							maxWidth: '138px',
							minHeight: '2px',
							backgroundColor: '#FFB800',
						}}
					></div>
				</div>
				<WallFriends
					friends={friends}
					setFriends={setFriends}
					isLoading={isLoading}
					isFriendExist={isFriendExist}
					setIsFriendExist={setIsFriendExist}
				/>
			</div>
			<AddFriend friends={friends} setFriends={setFriends} />
		</div>
	)
}

export default Friends
