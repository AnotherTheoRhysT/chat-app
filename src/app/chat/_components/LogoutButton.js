'use client'

import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const LogoutButton = ({ setAuth }) => {
	const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
	
	if (setAuth == null) return <Button>Log Out</Button>
	
	const logoutHanlder = () => {
		setSubmitting(true)
		console.log("Logging out")
		axios.post(`${process.env.SERVER_URL}/logout`)
			.then(res => {
				console.log("logged out", res)
				setAuth(null)
				cookies.remove('bearer-token')
				axios.defaults.headers.common['Authorization'] = null
				setSubmitting(false)
				router.push('/chat')
			})
			.catch(err => {
				console.log("log out error", err)
			})
	}
	if (submitting) return (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Logging out
    </Button>
	)
	return (
		<Button onClick={logoutHanlder}>Log Out</Button>
	)
}

export default LogoutButton