"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useContext } from 'react'
import LogoutButton from './LogoutButton'
import { AuthContext } from '@/components/providers/AuthProvider'
import { usePathname } from 'next/navigation'
import styles from '@/styles/nav.module.css'


const Navbar = () => {
const [auth, setAuth] = useContext(AuthContext)
	const pathname = usePathname()
	// console.log('navbar', cookies.get('bearer-token'), auth, axios.defaults.headers.common['Authorization'])
	return (
		<nav className={styles.nav_container} id='nav'>
			<div>
				<Button>
					<Link href='/chat'>Home</Link>
				</Button>
			</div>
			<div className='flex justify-center'>
				{
					auth &&	<h3>Welcome, {auth.name}</h3>
				}
			</div>
			<div className='flex justify-end'>
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
			</div>
		</nav>
	)
}

export default Navbar
