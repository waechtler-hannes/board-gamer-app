import { createContext, useEffect, useState} from 'react'
import { ID } from 'react-native-appwrite';
import { databases, client } from '../lib/appwrite';

//Hooks
import { useUser } from '../hooks/useUser';

const DATABASE_ID = '682d7452002c55c324be'
const COLLECTION_ID = '682d90b400068b157b16'

export const HostsContext = createContext()

export function HostsProvider({ children }) {
    const [hosts, setHosts] = useState([]);
    const { user } = useUser();

    async function fetchHosts() {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID
            );
            setHosts(response.documents)
        } catch (error) {
            console.error(error.message);
        }
    }

    async function fetchHostById(id) {
        try {
            
        } catch (error) {
            console.error(error.message);
        }
    }

    async function upsertHost(data) {
    try {
        const existing = hosts.find(host => host.userId === user.$id);
        if (existing) {
            await updateHost(existing.$id, data);
        } else {
            await createHost(data);
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

    async function createHost(data) {
        try {
            const newHost = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {...data, userId: user.$id}
            );
        } catch (error) {
            console.error(error.message)
        }
    }

    async function updateHost(id, data) {
        try {
            await databases.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id,
                data
            );
        } catch (error) {
            console.error(error.message);
        }
    }

    async function deleteHost(id) {
        try {
            
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        let unsubscribe
        const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`
        if (user) {
            fetchHosts()
            unsubscribe = client.subscribe(channel, (response) => {
                const { payload, events } = response
                if (events[0].includes('create')) {
                    setHosts((prevHosts) => [...prevHosts, payload])
                }
                if (events[0].includes('update')) {
                    setHosts((prevHosts) =>
                        prevHosts.map((host) =>
                            host.$id === payload.$id ? payload : host
                        )
                    );
                }
            })
        } else {
            setHosts([])
        }

        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }   
    }, [user])

    return (
        <HostsContext.Provider value={{ hosts, fetchHosts, fetchHostById, upsertHost, deleteHost }}>
            {children}
        </HostsContext.Provider>
    );
};