"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useContext } from 'react'
import LogoutButton from './LogoutButton'
import { AuthContext } from '@/components/providers/AuthProvider'
import { usePathname } from 'next/navigation'

const Navbar = () => {
const [auth, setAuth] = useContext(AuthContext)
	const pathname = usePathname()
	return (
		<nav className='flex justify-between'>
			<Button>
				<Link href='/chat'>Home</Link>
			</Button>
				{
					auth &&	<h3>Welcome, {auth.name}</h3>
				}
			{
				(pathname != '/chat/login') && 
				(	(auth) ?
					<LogoutButton setAuth={setAuth} />
					:
					<Button>
						<Link href='/chat/login'>Sign In</Link>
					</Button>
				)
			}
		</nav>
	)
}

export default Navbar
