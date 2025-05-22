import { createContext, useEffect, useState} from 'react'
import { databases, client } from '../lib/appwrite';
import { ID } from 'react-native-appwrite';
import { useUser } from '../hooks/useUser';

const DATABASE_ID = '682d7452002c55c324be'
const COLLECTION_ID = '682d7522001f8a8496c5'
const HOST_COLLECTION_ID = '682d90b400068b157b16'

export const EventsContext = createContext()

export function EventsProvider({ children }) {
    const [events, setEvents] = useState([]);
    const { user } = useUser();

    async function fetchEvents() {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID
            );
            setEvents(response.documents)
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
                {...data}
            );
        } catch (error) {
            console.error(error.message);
        }
    }

    async function updateEvent(eventId, updateData) {
        try {
            await databases.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                eventId,
                updateData
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

    useEffect(() => {
        let unsubscribeEvents, unsubscribeHosts;
        const eventChannel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;
        const hostChannel = `databases.${DATABASE_ID}.collections.${HOST_COLLECTION_ID}.documents`;
        if (user) {
            fetchEvents();
            unsubscribeEvents = client.subscribe(eventChannel, (response) => {
                const { payload, events } = response;
                if (events[0].includes('create')) {
                    setEvents((prevEvents) => [...prevEvents, payload]);
                }
                if (events[0].includes('update')) {
                    setEvents((prevEvents) =>
                        prevEvents.map((event) =>
                            event.$id === payload.$id ? payload : event
                        )
                    );
                }
            });
            unsubscribeHosts = client.subscribe(hostChannel, (response) => {
                const { payload, events } = response;
                if (events[0].includes('update')) {
                    setEvents((prevEvents) =>
                        prevEvents.map((event) =>
                            event.host && event.host.$id === payload.$id
                                ? { ...event, host: payload }
                                : event
                        )
                    );
                }
            });
        } else {
            setEvents([]);
        }

        return () => {
            if (unsubscribeEvents) unsubscribeEvents();
            if (unsubscribeHosts) unsubscribeHosts();
        };
    }, [user]);

    return (
        <EventsContext.Provider value={{ events, fetchEvents, fetchEventById, createEvent, updateEvent, deleteEvent }}>
            {children}
        </EventsContext.Provider>
    );
};