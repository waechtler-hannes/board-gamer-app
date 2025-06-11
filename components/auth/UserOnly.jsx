import { useEffect } from 'react'
import { useRouter } from 'expo-router'

//Hooks
import { useUser } from '../../hooks/useUser'

//Eigene Komponenten
import Loader from '../Loader'

const UserOnly = ({ children }) => {
    const { user, authChecked } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (authChecked && user === null) {
            router.replace('/')
        }
    }, [user, authChecked])

    if (!authChecked || !user) {
        return (
            <Loader/>
        )
    }

    return children
}

export default UserOnly