"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useContext, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import Cookies from "universal-cookie"
import { AuthContext } from "@/components/providers/AuthProvider"
import { ReloadIcon } from "@radix-ui/react-icons"

axios.defaults.withCredentials = true

const cookies = new Cookies()

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string()
}).required()

/**
 * TODO: Remove ZOD, Use React-Hook-Form, extract client components
 */
const Page = () => {
  const [submitting, setSubmitting] = useState(false)
  const form = useForm({
    resolver: zodResolver(LoginSchema),
  })

  const router = useRouter()
  
  if (cookies.get('bearer-token')) router.push('/chat')

	// Handle form submission
  const onSubmit = (formData) => {
    setSubmitting(true)
    console.log('submitting...')
		axios.get(`${process.env.SERVER_URL}/sanctum/csrf-cookie`)
			.then(res => {
				console.log("Got sanctum", res)
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
			})
			.catch(err => {
				console.log("Sanctum error", err)
			})
  }

  const [auth, setAuth] = useContext(AuthContext)

  return (
    <Form {...form}	>
      <main className='grid place-items-center'>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          {
            (submitting)
            ?
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Submitting
            </Button>
            :
            <Button type="submit">Submit</Button>
          }
        </form>
      </main>
    </Form>
  )
}

export default Page