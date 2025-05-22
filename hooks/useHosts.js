import { useContext } from 'react'
import { HostsContext } from '../contexts/HostContext'

export function useHosts() {
    const context = useContext(HostsContext)

    if (!context) {
        throw new Error("useHosts must be used within a HostsProvider")
    }

    return context
}