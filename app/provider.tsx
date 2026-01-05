'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { UserDetailsContext } from '@/context/UserDetailsContext'

export const Provider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUser()
    const [userDetails, setUserDetails] = useState<any>(null)

    useEffect(() => {
        if (user) {
            CreateNewUser()
        }
    }, [user])

    const CreateNewUser = async () => {
        try {
            const res = await axios.post('/api/users', {})
            console.log(res.data)
            setUserDetails(res.data?.user)
        } catch (error) {
            console.error('Error creating user:', error)
        }
    }

    return (
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserDetailsContext.Provider>
    )
}
