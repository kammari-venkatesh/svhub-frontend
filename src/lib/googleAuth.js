import { signInWithPopup, signOut } from 'firebase/auth'
import { AuthError } from '../api/auth.js'
import { createGoogleProvider, getFirebaseAuth, isFirebaseConfigured } from './firebase.js'

const FIREBASE_MESSAGES = {
  'auth/popup-closed-by-user': 'Google Sign-In was closed before it finished. Try again.',
  'auth/cancelled-popup-request': 'Google Sign-In was closed before it finished. Try again.',
  'auth/popup-blocked': 'Your browser blocked the Google Sign-In window. Allow popups for this site and try again.',
  'auth/account-exists-with-different-credential':
    'An account already exists with this email using a different sign-in method. Log in with email and password, or use the original provider.',
  'auth/network-request-failed': 'We couldn’t reach Google Sign-In. Check your connection and try again.',
  'auth/unauthorized-domain': 'This domain is not approved for Google Sign-In. Add it in the Firebase console.',
  'auth/operation-not-allowed': 'Google Sign-In is not enabled yet. Enable it in the Firebase console.',
}

export function mapFirebaseError(error) {
  if (error instanceof AuthError) return error

  const code = error?.code || 'auth/unknown'
  if (code === 'auth/network-request-failed' || error?.message === 'Failed to fetch') {
    return new AuthError('network', FIREBASE_MESSAGES['auth/network-request-failed'])
  }

  return new AuthError(
    code,
    FIREBASE_MESSAGES[code] || 'Google Sign-In didn’t work. Please try again.',
  )
}

export async function signInWithGooglePopup() {
  const auth = getFirebaseAuth()
  if (!isFirebaseConfigured() || !auth) {
    throw new AuthError('config', 'Google Sign-In is not configured.')
  }

  try {
    const result = await signInWithPopup(auth, createGoogleProvider())
    return result.user.getIdToken()
  } catch (error) {
    throw mapFirebaseError(error)
  }
}

export async function signOutFirebase() {
  const auth = getFirebaseAuth()
  if (!auth) return
  try {
    await signOut(auth)
  } catch (error) {
    throw mapFirebaseError(error)
  }
}
