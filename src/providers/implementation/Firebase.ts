import admin from "firebase-admin"

const config = {
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL
    })
}

export const firebase = admin.apps.length
    ? admin.app()
    : admin.initializeApp(config)

const apiKey = process.env.FIREBASE_API_KEY
export const firebaseLinks = {
    signInWithPassword:`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    signUp:`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    update:`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
    refreshToken:`https://securetoken.googleapis.com/v1/token?key=${apiKey}`
}