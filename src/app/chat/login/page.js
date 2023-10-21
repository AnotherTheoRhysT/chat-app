import React from 'react'
import LoginForm from './_components/LoginForm'
import getUser from '@/utils/server/getUser'
import { redirect } from 'next/navigation'

const Page = async () => {
	const user = await getUser()
	// console.log(user)
	if (user) redirect('/chat')
	return (
		<LoginForm />
	)
}

export default Page