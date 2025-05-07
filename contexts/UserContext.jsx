import { createContext, useState } from 'react'

export const UserContext = createContext()

export function UserProvider ({ children }) {
    const [user, setUser] = useState(null) //später wieder ändern

    async function login(email, passowrd) {

    }

    async function register (email, password) {

    }

    async function logout () {

    }

    return(
        
        <UserContext.Provider value={{user, login, register, logout}}>
            {children}
        </UserContext.Provider>
    )
}