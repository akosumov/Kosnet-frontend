import React, { FC, useState } from 'react'

import NavigationMenu from '../../components/navigateMenu/NavigationMenu'
import Thoughts from '../../components/feedComponents/Thoughts'
import CreateThought from '../../components/createThought/CreateThought'

const Feed: FC = () => {
	const user = JSON.parse(localStorage.getItem('user') as any)
	const [allThoughts, setAllThoughts] = useState<any[]>([])

	return (
		<div className='flex justify-center bg-black min-h-screen pt-5 gap-20'>
			<NavigationMenu />
			<div
				className='flex flex-col border-x border-gray-800'
				style={{ marginTop: '-20px', minWidth: '600px', maxWidth: '600px' }}
			>
				<div className='flex justify-between pt-5 px-6 mb-10'>
					<div className='text-3xl text-white flex gap-2'>
						Welcome, <div className='text-yellow-500'>{user.username}</div>
					</div>
					<div className='text-3xl text-white'>Thoughts</div>
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
				<Thoughts allThoughts={allThoughts} setAllThoughts={setAllThoughts} />
			</div>
			<CreateThought
				allThoughts={allThoughts}
				setAllThoughts={setAllThoughts}
			/>
		</div>
	)
}

export default Feed
