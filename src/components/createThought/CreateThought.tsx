import React, { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createThoughts } from '../../services/api'
import { ICreateThoughts } from '../../types/types'
import { getThought } from '../../services/api'

interface IAllThought {
	allThoughts: Array<any>
	setAllThoughts: Function
}

const CreateThought: FC<IAllThought> = ({ allThoughts, setAllThoughts }) => {
	type createThought = {
		textThoughts: string
	}
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<createThought>()

	const userId = localStorage.getItem('USERID') as any
	const userName = JSON.parse(localStorage.getItem('user') as any).username
	const thoughtData: ICreateThoughts = {
		thoughtText: '',
		username: userName,
		userId: userId,
	}

	//Sorry about the shit code ((
	const onSubmit: SubmitHandler<createThought> = async data => {
		thoughtData.thoughtText = data.textThoughts
		const { thoughtText, username, userId } = thoughtData

		const response = await createThoughts({ thoughtText, username, userId })
		const ourThoughts = response.thoughts
		const ourThoughtId = ourThoughts[ourThoughts.length - 1]

		const currentThoughtData = await getThought(ourThoughtId)
		setAllThoughts([...allThoughts, currentThoughtData])
		reset()
	}

	return (
		<div
			className='border border-gray-800'
			style={{ minWidth: '340px', maxHeight: '220px' }}
		>
			<div className='text-2xl text-yellow-500 border-b border-gray-800 pb-3 pt-2 pl-3'>
				Create Thought
			</div>
			<form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
				<input
					style={{ minHeight: '60px' }}
					className='placeholder:text-white border-b border-gray-800  p-2 pl-3 bg-black  text-white'
					placeholder='Text'
					{...register('textThoughts', { required: true })}
				/>
				{errors.textThoughts && errors.textThoughts.type === 'required' && (
					<span className='text-red-600 ml-1'>
						Text thoughts must be required
					</span>
				)}
				<button
					className='bg-yellow-500 rounded h-10 text-black font-semibold mt-7 ml-3'
					style={{ maxWidth: '195px' }}
					type='submit'
				>
					CONFIRM{' '}
				</button>
			</form>
		</div>
	)
}

export default CreateThought
