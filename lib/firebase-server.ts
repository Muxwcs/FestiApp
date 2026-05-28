// import admin from "firebase-admin"

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     }),
//   })
// }

// export const verifyIdToken = async (token: string) => {
//   try {
//     return await admin.auth().verifyIdToken(token)
//   } catch (error) {
//     console.error("Error verifying Firebase token:", error)
//     return null
//   }
// }

import admin from "firebase-admin"

function parseFirebasePrivateKey(): string | undefined {
  const raw = process.env.FIREBASE_PRIVATE_KEY
  if (!raw) return undefined

  // Strip wrapping quotes if present
  let key = raw
  if (key.startsWith('"') && key.endsWith('"')) {
    key = key.slice(1, -1)
  }

  // Replace escaped newlines with real newlines
  key = key.replace(/\\n/g, "\n")

  return key
}

function initFirebaseAdmin() {
  if (admin.apps.length) return

  const privateKey = parseFirebasePrivateKey()
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL

  // Skip initialization during build if credentials are missing
  if (!privateKey || !projectId || !clientEmail) {
    console.warn("Firebase Admin: credentials not available, skipping init (build phase)")
    return
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

initFirebaseAdmin()

export const verifyIdToken = async (token: string) => {
  try {
    if (!admin.apps.length) {
      console.error("Firebase Admin not initialized")
      return null
    }
    return await admin.auth().verifyIdToken(token)
  } catch (error) {
    console.error("Error verifying Firebase token:", error)
    return null
  }
}