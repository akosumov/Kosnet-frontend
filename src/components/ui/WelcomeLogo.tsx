import React, { FC } from 'react'
import { TfiWorld } from 'react-icons/tfi'
import clsx from 'clsx'

interface logoProps {
	className?: string
}

const WelcomeLogo: FC<logoProps> = logoProps => {
	return (
		<div className={clsx('logo flex gap-3', logoProps.className)}>
			<TfiWorld size={120} color='white ' />
			<div className='flex flex-col gap-2'>
				<h1 className='font-black text-white text-6xl'>KOSNET</h1>
				<div className='bg-white' style={{ padding: '3px' }}>
					<p className='font-bold text-base'>TELL EVERYONE YOUR THOUGHTS.</p>
				</div>
			</div>
		</div>
	)
}

export default WelcomeLogo
