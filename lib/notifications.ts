import webpush from "web-push"

if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.warn(
    "⚠️  VAPID keys missing. Run `npx web-push generate-vapid-keys` and add them to .env"
  )
}

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT || "mailto:contact@festiapp.fr",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "",
  process.env.VAPID_PRIVATE_KEY || ""
)

export interface PushPayload {
  title: string
  body: string
  icon?: string
  url?: string
  tag?: string
}

export async function sendPushNotification(
  subscription: { endpoint: string; p256dh: string; auth: string },
  payload: PushPayload
) {
  const pushSubscription = {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.p256dh,
      auth: subscription.auth,
    },
  }

  return webpush.sendNotification(
    pushSubscription,
    JSON.stringify(payload)
  )
}

export { webpush }
