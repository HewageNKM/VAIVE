import {Account, Avatars, Client, Databases, ID} from 'react-native-appwrite';

const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform: process.env.EXPO_PUBLIC_PLATFORM,
    appwriteDBId: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
    userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
    videoCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEOS_COLLECTION_ID,
    storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID,
}
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.project) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.;

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (userName: string, email: string, password: string) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, userName)
        if (!newAccount) {
            Error('Account not created')
        }
        const avatarUrl = avatars.getInitials(userName)
        await signIn(email, password)
        const newUser = await databases.createDocument(config.appwriteDBId, config.userCollectionId, ID.unique(), {
            username: userName,
            password,
            email,
            avatar: avatarUrl,
            accountId: newAccount.$id
        })
        if (!newUser) {
            Error('User not created')
        }
        return newUser
    } catch (e) {
        console.error(e)
        throw new Error(e)
    }
}

export const signIn = async (email: string, password: string) => {
    try {
        return await account.createEmailPasswordSession(email, password);
    } catch (e) {
        console.error(e)
        throw new Error(e)
    }
}