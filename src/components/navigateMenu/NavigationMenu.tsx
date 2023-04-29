import React, { FC } from 'react'
import { TfiWorld } from 'react-icons/tfi'
import { Link } from 'react-router-dom'
import { navigationItems } from './navigateData'

const NavigationMenu: FC = () => {
	return (
		<div className='flex flex-col gap-6'>
			<Link to={'/feed'} className='flex items-center gap-3 mb-5'>
				<TfiWorld size={35} color='white ' />
				<h1 className='font-black text-white text-3xl'>KOSNET</h1>
			</Link>
			{navigationItems.map(nav => {
				if (nav.link === document.location.pathname) {
					return (
						<div key={nav.name}>
							<Link
								to={nav.link}
								className='flex items-center gap-5'
								style={{ maxWidth: '105px' }}
							>
								<nav.icons size={25} color='#ffb000 ' />
								<h2 className='text-xl text-yellow-500'>{nav.name}</h2>{' '}
							</Link>
						</div>
					)
				} else {
					return (
						<div key={nav.name}>
							<Link
								to={nav.link}
								className='flex items-center gap-5'
								style={{ maxWidth: '105px' }}
							>
								<nav.icons size={25} color='white ' />
								<h2 className='text-xl text-white'>{nav.name}</h2>{' '}
							</Link>
						</div>
					)
				}
			})}
		</div>
	)
}

export default NavigationMenu
