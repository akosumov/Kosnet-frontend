import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavigationMenu from '../../components/navigateMenu/NavigationMenu'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import PostOfFriend from '../../components/postOfFriend/PostOfFriend'
import { findUserById } from '../../services/api'
import { IUser } from '../../types/types'

const FriendThoughts: FC = () => {
	const friendId = useParams().id!
	const [dataFriend, setDataFriend] = useState<IUser>({
		_id: '',
		username: '',
		password: '',
		email: '',
	})

	const getDataFriend = async (friendId: string) => {
		const data = await findUserById(friendId)
		if (data !== undefined) {
			setDataFriend(data)
		}
	}
	useEffect(() => {
		getDataFriend(friendId)
	}, [])

	return (
		<div className='flex justify-center bg-black min-h-screen pt-5 gap-20'>
			<NavigationMenu />
			<div
				className='flex flex-col border-x border-gray-800'
				style={{ marginTop: '-20px', minWidth: '600px', maxWidth: '600px' }}
			>
				<div className='flex items-center gap-6 pt-5 px-6 mb-10'>
					<Link to={'/friends'}>
						<AiOutlineArrowLeft size={25} color='#ffb000' />
					</Link>
					<div className='text-3xl text-white flex gap-2'>
						Friend's Thoughts
					</div>
				</div>

				<div className=' border-b border-gray-800'>
					<div className='text-amber-400 font-bold text-base font-mono pl-8 mb-4'>
						Current
					</div>
					<div
						style={{
							maxWidth: '138px',
							minHeight: '2px',
							backgroundColor: '#FFB800',
						}}
					></div>
				</div>
				<PostOfFriend friendId={friendId} />
			</div>
			<div
				className='border border-gray-800'
				style={{ minWidth: '340px', maxHeight: '120px' }}
			>
				<div className='text-2xl text-yellow-500 pb-2 pt-2 pl-3'>
					Friend: {dataFriend.username}
				</div>
				<div className='text-2xl text-white pb-1 pt-2 pl-3'>
					{dataFriend.thoughts?.length} posts
				</div>
			</div>
		</div>
	)
}

export default FriendThoughts
