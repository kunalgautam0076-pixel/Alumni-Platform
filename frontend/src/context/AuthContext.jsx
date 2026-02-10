import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
  const [user, setUser] = useState(()=>{
    const raw = localStorage.getItem('alumni_user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(()=>{
    const token = localStorage.getItem('alumni_token')
    if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }, [])

  const login = (data)=>{
    localStorage.setItem('alumni_token', data.token)
    localStorage.setItem('alumni_user', JSON.stringify(data.user))
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    setUser(data.user)
  }

  const logout = ()=>{
    localStorage.removeItem('alumni_token')
    localStorage.removeItem('alumni_user')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}

export const useAuth = ()=> useContext(AuthContext)
