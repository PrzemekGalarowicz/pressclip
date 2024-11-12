import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const firebaseSdk = require('@/firebase-adminsdk.jsons')

export const serverApp =
  getApps().length === 0
    ? initializeApp({ credential: cert(firebaseSdk) })
    : getApp()
export const serverDb = getFirestore(serverApp)
