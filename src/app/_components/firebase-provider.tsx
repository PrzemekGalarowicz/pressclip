'use client'

import { auth } from '@/lib/firebase'
import { useAuth } from '@clerk/nextjs'
import { signInWithCustomToken } from 'firebase/auth'
import * as React from 'react'

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn, getToken } = useAuth()

  // Wrap the signIntoFirebaseWithClerk function with useCallback
  const signIntoFirebaseWithClerk = React.useCallback(async () => {
    try {
      // Retrieve the Clerk token
      const token = await getToken({ template: 'integration_firebase' })

      // Sign in to Firebase using the Clerk-provided custom token
      const userCredentials = await signInWithCustomToken(auth, token || '')
      if (process.env.NODE_ENV === 'development') {
        console.log('User signed into Firebase:', userCredentials.user)
      }
      // Firebase authenticated user can now call Firebase methods
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error signing into Firebase:', error)
      }
    }
  }, [getToken]) // Add getToken as a dependency

  // Sign into Firebase whenever Clerk user is authenticated
  React.useEffect(() => {
    if (isSignedIn) {
      signIntoFirebaseWithClerk()
    } else {
      // Sign out from Firebase if Clerk session is not active
      auth.signOut().then(() => {
        if (process.env.NODE_ENV === 'development') {
          console.log('User signed out from Firebase')
        }
      })
    }
  }, [isSignedIn, signIntoFirebaseWithClerk])

  return children
}
