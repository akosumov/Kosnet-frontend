import React, { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { addFriendById } from '../../services/api'
import { findUserById } from '../../services/api'

interface IAllFriends {
	friends: Array<any>
	setFriends: Function
}

const AddFriend: FC<IAllFriends> = ({ friends, setFriends }) => {
	type addFriend = {
		friendId: string
	}
	const userId = localStorage.getItem('USERID') as any
	const [anyErrorsFriendById, setAnyErrorsFriendById] = useState({
		isAddingYourself: false,
		isFriendHasAlreadyBeenAdded: false,
	})

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<addFriend>()

	const onSubmit: SubmitHandler<addFriend> = async data => {
		let repeatingFriend = ''
		const friendId = data.friendId
		friends.map(friend => {
			if (friend._id === data.friendId) {
				setAnyErrorsFriendById({
					...anyErrorsFriendById,
					isFriendHasAlreadyBeenAdded: true,
				})
				repeatingFriend = data.friendId
			}
		})

		if (friendId === repeatingFriend) {
			setAnyErrorsFriendById({
				...anyErrorsFriendById,
				isFriendHasAlreadyBeenAdded: true,
			})
			return
		}

		if (friendId === userId) {
			setAnyErrorsFriendById({ ...anyErrorsFriendById, isAddingYourself: true })
			return
		}

		setAnyErrorsFriendById({
			...anyErrorsFriendById,
			isAddingYourself: false,
			isFriendHasAlreadyBeenAdded: false,
		})

		await addFriendById(userId, friendId)
		const friend = await findUserById(friendId)
		setFriends([...friends, friend])
		reset()
	}

	return (
		<div
			className='border border-gray-800 flex flex-col'
			style={{ minWidth: '340px', height: '220px' }}
		>
			<div className='text-2xl text-yellow-500 border-b border-gray-800 pb-3 pt-2 pl-3'>
				Add Friend
				<div className='text-white text-base'>Your ID {userId}</div>
			</div>

			<form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
				<input
					style={{ minHeight: '60px' }}
					className='placeholder:text-white border-b border-gray-800  p-2 pl-3 bg-black  text-white'
					placeholder='ID of friend'
					{...register('friendId', {
						required: true,
						minLength: 24,
						maxLength: 24,
					})}
				/>

				<button
					className='bg-yellow-500 rounded h-10 text-black font-semibold mt-7 ml-3'
					style={{ maxWidth: '195px' }}
					type='submit'
				>
					CONFIRM
				</button>
			</form>
			{errors.friendId && errors.friendId.type === 'required' && (
				<span className='text-red-600 ml-1 mt-2 '>Enter correct id!</span>
			)}
			{errors.friendId && errors.friendId.type === 'minLength' && (
				<span className='text-red-600 ml-1 mt-2 '>Enter correct id!</span>
			)}
			{errors.friendId && errors.friendId.type === 'maxLength' && (
				<span className='text-red-600 ml-1 mt-2 '>Enter correct id!</span>
			)}
			{anyErrorsFriendById.isAddingYourself && (
				<span className='text-red-600 ml-1 mt-2 '>
					You can't add yourself as a friend
				</span>
			)}
			{anyErrorsFriendById.isFriendHasAlreadyBeenAdded && (
				<span className='text-red-600 ml-1 mt-2 '>
					You can't add a user twice as a friend
				</span>
			)}
		</div>
	)
}

export default AddFriend
