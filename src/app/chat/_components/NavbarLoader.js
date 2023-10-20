import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import getUser from '@/utils/server/getUser'
import getPathname from '@/utils/server/getPathname'
import LogoutButton from './LogoutButton'

const NavbarLoader = async () => {
	const user = await getUser()
	const pathname = getPathname()
	
	const isLoggedIn = user != null
	return (
		<nav className='flex justify-between'>
			<Button>
				<Link href='/chat'>Home</Link>
			</Button>
			<div>

			</div>
			{
				(isLoggedIn) && <h3>Welcome, {user.name}</h3>
			}
			{
				(pathname != '/chat/login') && 
				(isLoggedIn
					?
						<LogoutButton setAuth={null}/>
					:
						<Button>
							<Link href='/chat/login'>Sign In</Link>
						</Button>
				)
			}
		</nav>
	)
}

export default NavbarLoader
