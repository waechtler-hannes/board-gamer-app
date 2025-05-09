import { Client, Account, Avatars } from 'react-native-appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('681db08d0003de30462b')
    .setPlatform('com.school.nextgame');
const account = new Account(client);
const avatars = new Avatars(client);

export { client, account, avatars };