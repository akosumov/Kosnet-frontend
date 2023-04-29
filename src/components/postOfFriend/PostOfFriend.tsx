import React, { FC, useState, useEffect } from 'react'
import { findUserById } from '../../services/api'
import { AiOutlineCalendar } from 'react-icons/ai'
import { IThoughts } from '../../types/types'

interface IIdOfFriend {
	friendId: string
}

const PostOfFriend: FC<IIdOfFriend> = ({ friendId }) => {
	const [allThoughtsFriend, setAllThoughtsFriend] = useState<IThoughts>([])

	const getAllThoughts = async (friendId: string) => {
		const data = await findUserById(friendId)
		setAllThoughtsFriend(data.thoughts)
	}

	useEffect(() => {
		getAllThoughts(friendId)
	}, [])
	return (
		<div>
			<>
				{allThoughtsFriend
					.map((thought: any) => {
						return (
							<div
								className='pl-8 pt-4 pr-11 border-b border-gray-800'
								style={{ minWidth: '590px' }}
								key={thought._id}
							>
								<div className=' text-2xl text-yellow-500 font-medium mb-4'>
									{thought.username}
								</div>
								<div className='text-white mb-5'>{thought.thoughtText}</div>
								<div className='flex gap-2'>
									<div>
										<AiOutlineCalendar
											size={20}
											color='white'
											style={{ marginTop: '3px' }}
										/>
									</div>
									<div className='flex items-center gap-36 mb-4'>
										<div className='text-white mb-3'>{thought.createdAt}</div>
									</div>
								</div>
							</div>
						)
					})
					.reverse()}
			</>
		</div>
	)
}

export default PostOfFriend
