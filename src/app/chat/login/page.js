"use client"

import React, { useContext, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ReloadIcon } from '@radix-ui/react-icons'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import axios from 'axios'
import { v4 as uuidv4 } from "uuid"
import Cookies from 'universal-cookie'
import { AuthContext } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string()
}).required()

const cookies = new Cookies()

const Page = () => {
	const { register, handleSubmit } = useForm({
		resolver: zodResolver(loginSchema)
	})
	const [submitting, setSubmitting] = useState(false)
  const [auth, setAuth] = useContext(AuthContext)
  const router = useRouter()

	useEffect(() => {
		axios.get(`${process.env.SERVER_URL}/sanctum/csrf-cookie`)
			.then(res => {
				console.log("Got sanctum", res)
			})
			.catch(err => {
				console.log("Sanctum error", err)
			})
	}, [])

  if (cookies.get('bearer-token')) {
		router.push('/chat')
	}


	const onSubmit = (formData) => {
		setSubmitting(true)
		console.log(formData)
		axios.post(`${process.env.SERVER_URL}/login`, {
			email: formData.email,
			password: formData.password,
			token_name: uuidv4(),
		})
		.then(res => {
			console.log("logged in", res)
			setAuth(res.data.user)
			const bearerToken = `Bearer ${res.data.token}`
			cookies.set('bearer-token', bearerToken, {path: '/'})
			axios.defaults.headers.common['Authorization'] = bearerToken
      setSubmitting(false)
			router.push('/chat')
		})
		.catch(err => {
			console.log("log in error", err)
		})
	}

	return (
		<main className='grid place-items-center'>
			<form onSubmit={handleSubmit(onSubmit)} className='min-w-[30rem]'>
				<Input className="mb-2" placeholder="Email" type="text" {...register("email")}/>
				<Input className="mb-2" placeholder="Password" type="password" {...register("password")} />
				<div className='flex flex-row-reverse'>
					{ submitting ?
						<Button disabled>
							<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
							Signing in
						</Button>
						:
						<Button type="submit">Sign in</Button>
					}
				</div>
			</form>
		</main>
	)
}

export default Page