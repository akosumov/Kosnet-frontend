import React, { FC } from 'react'
import NavigationMenu from '../../components/navigateMenu/NavigationMenu'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import ProfileSettings from '../../components/profileComponent/ProfileSettings'

const Profile: FC = () => {
	const navigate = useNavigate()
	const user = JSON.parse(localStorage.getItem('user') as any)
	const userID = localStorage.getItem('USERID') as any

	return (
		<div
			className='flex justify-center bg-black min-h-screen pt-5 gap-20'
			style={{ paddingRight: '420px' }}
		>
			<NavigationMenu />
			<div
				className='flex flex-col border-x border-gray-800'
				style={{ marginTop: '-20px', minWidth: '600px', maxWidth: '600px' }}
			>
				<div className='flex items-center gap-6 pt-5 px-6 mb-7'>
					<div onClick={e => navigate(-1)}>
						<AiOutlineArrowLeft size={25} color='#ffb000' />
					</div>

					<div className='text-3xl text-white flex gap-2'>My profile</div>
				</div>
				<div className=' border-b border-gray-800'></div>
				<div className='text-3xl font-medium text-yellow-500 ml-8 mt-8'>
					{user.username}
				</div>
				<ProfileSettings
					_id={userID}
					username={user.username}
					password={user.password}
					email={user.email}
				/>
			</div>
		</div>
	)
}

export default Profile
