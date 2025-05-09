import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useUser } from '../../hooks/useUser'

//Eigene Komponenten
import Loader from '../Loader'

const GuestOnly = ({ children }) => {
    const { user, authChecked } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (authChecked && user !== null) {
            router.replace('/events')
        }
    }, [user, authChecked])

    if (!authChecked || user) {
        return (
            <Loader/>
        )
    }

    return children
}

export default GuestOnly