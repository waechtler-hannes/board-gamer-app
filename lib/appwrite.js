import { Client, Account, Avatars, Databases, Query } from 'react-native-appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('681db08d0003de30462b')
    .setPlatform('com.school.nextgame');
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export { client, account, avatars, databases, Query };