'use client'

// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBnwE1jbFE3gHoKveoGQBLznGKXWuHMZXk',
  authDomain: 'pressclip-80e28.firebaseapp.com',
  projectId: 'pressclip-80e28',
  storageBucket: 'pressclip-80e28.firebasestorage.app',
  messagingSenderId: '507030968138',
  appId: '1:507030968138:web:164f1ce1801aaf71be93b3',
  measurementId: 'G-43NW739H95',
}

// Initialize Firebase
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)
