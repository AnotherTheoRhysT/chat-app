'use client'

import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();
const token = cookies.get('bearer-token')
// console.log('bearer token', token)
if (token) {
  axios.defaults.headers.common['Authorization'] = token
} else {
  axios.defaults.headers.common['Authorization'] = null
}
axios.defaults.withCredentials = true

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(null)
	useEffect(() => {
		if (axios.defaults.headers.common['Authorization'] && !auth) {
      axios.get(`${process.env.SERVER_URL}/api/user`)
        .then(res => {
          setAuth(res.data)
        })
        .catch(err => {
          console.log('login err', err)
          if (err.response.status == 401) {
            console.log("Invalid Token")
            cookies.remove('bearer-token')
            axios.defaults.headers.common['Authorization'] = null
          }
        })
    }
	}, [auth])
	return (
		<AuthContext.Provider value={[auth, setAuth]}>
			{ children }
		</AuthContext.Provider>
	)
}

export default AuthProvider

export { AuthContext }