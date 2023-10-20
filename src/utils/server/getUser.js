import { cookies } from 'next/headers'
import React from 'react'

const getUser = async () => {
	const token = cookies().get('bearer-token')
	if (!token) return null

	const res = await fetch(`${process.env.SERVER_URL}/api/user`, {
		method: "GET",
		headers: {
		"Content-Type": "application/json",
		"Authorization": token.value
		}
	})
	
	if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch user data')
  }
	return res.json()
}

export default getUser