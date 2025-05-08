import { Client, Account, Avatars } from 'react-native-appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('681c43fb0017940553f6')
    .setPlatform('com.school.nextgame');
const account = new Account(client);
const avatars = new Avatars(client);

export { client, account, avatars };