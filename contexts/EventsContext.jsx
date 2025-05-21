import { createContext, useState} from 'react'
import { databases } from '../lib/appwrite';
import { ID, Permission, Role } from 'react-native-appwrite';
import { useUser } from '../hooks/useUser';

const DATABASE_ID = '682d7452002c55c324be'
const COLLECTION_ID = '682d7522001f8a8496c5'

export const EventsContext = createContext()

export function EventsProvider({ children }) {
    const [events, setEvents] = useState([]);
    const { user } = useUser();

    async function fetchEvents() {
        try {
            
        } catch (error) {
            console.error(error.message);
        }
    }

    async function fetchEventById(id) {
        try {
            
        } catch (error) {
            console.error(error.message);
        }
    }

    async function createEvent(data) {
        try {
            const newEvent = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {...data, userId: user.$id},
                [
                    Permission.read(Role.user(user.$id)),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id))
                ]
            );
        } catch (error) {
            console.error(error.message);
        }
    }

    async function deleteEvent(id) {
        try {
            
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <EventsContext.Provider value={{ events, fetchEvents, fetchEventById, createEvent, deleteEvent }}>
            {children}
        </EventsContext.Provider>
    );
};