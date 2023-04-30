import React, { FC, useEffect, useState, useMemo } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { findUserById, deleteThought } from '../../services/api'
import { TailSpin } from 'react-loader-spinner'

interface IAllThought {
	allThoughts: Array<any>
	setAllThoughts: Function
}

const Thoughts: FC<IAllThought> = ({ allThoughts, setAllThoughts }) => {
	const username = JSON.parse(localStorage.getItem('user') as any).username
	const userId = localStorage.getItem('USERID') as any
	const [cooldownButton, setCooldownButton] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [isPostExist, setIsPostExist] = useState<boolean>()

	const ThoughtsId = async (userId: string) => {
		const user = await findUserById(userId)
		console.log(user)

		if (user !== undefined) {
			const thoughts = user.thoughts
			if (!thoughts.length) {
				setIsPostExist(false)
			} else {
				setIsPostExist(true)
				console.log(thoughts)
				setAllThoughts(thoughts)
			}
		}
	}

	const deteleThoughtAndCooldown = async (thoughtId: string) => {
		setCooldownButton(true)
		await deleteThought(thoughtId)
		setAllThoughts(allThoughts.filter(item => item._id !== thoughtId))
		setIsPostExist(false)
		setCooldownButton(false)
	}

	useEffect(() => {
		ThoughtsId(userId)
		setIsLoading(false)
	}, [setAllThoughts])

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
			{allThoughts
				.map(thought => {
					return (
						<div
							className='pl-8 pt-4 pr-11 border-b border-gray-800'
							style={{ minWidth: '590px' }}
							key={thought._id}
						>
							<div className=' text-2xl text-yellow-500 font-medium mb-4'>
								{username}
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
									<button
										className='bg-yellow-500 rounded h-10 text-black px-5'
										onClick={(e: any) => deteleThoughtAndCooldown(thought._id)}
										disabled={cooldownButton}
									>
										Delete thought
									</button>
								</div>
							</div>
						</div>
					)
				})
				.reverse()}
			{allThoughts.length === 0 && isPostExist == false ? (
				<div className='flex justify-center mt-4 text-3xl text-yellow-500'>
					There are no posts.
				</div>
			) : (
				''
			)}
		</>
	)
}

export default Thoughts
