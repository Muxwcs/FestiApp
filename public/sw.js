/// <reference lib="webworker" />

const CACHE_NAME = "festiapp-v1";

const STATIC_ASSETS = [
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/background-public.png",
];

// Install: pre-cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)),
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

// Fetch: network-first for API/navigation, cache-first for static assets
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET and cross-origin
  if (event.request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // API calls & HTML navigations → network first, fallback to cache
  if (url.pathname.startsWith("/api") || event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful navigations for offline
          if (event.request.mode === "navigate" && response.ok) {
            const clone = response.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request)),
    );
    return;
  }

  // Static assets → cache first, then network
  if (
    url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico|woff2?|ttf|css|js)$/)
  ) {
    event.respondWith(
      caches.match(event.request).then(
        (cached) =>
          cached ||
          fetch(event.request).then((response) => {
            if (response.ok) {
              const clone = response.clone();
              caches
                .open(CACHE_NAME)
                .then((cache) => cache.put(event.request, clone));
            }
            return response;
          }),
      ),
    );
    return;
  }
});

// Push notification handler
self.addEventListener("push", (event) => {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: "Festiapp", body: event.data.text() };
  }

  const options = {
    body: data.body || "",
    icon: data.icon || "/icon-192x192.png",
    badge: "/icon-192x192.png",
    vibrate: [100, 50, 100],
    tag: data.tag || "festiapp-notification",
    renotify: true,
    data: {
      url: data.url || "/",
    },
    actions: data.actions || [],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "Festiapp", options),
  );
});

// Notification click → open/focus the app
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        // Focus existing window if any
        for (const client of clients) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            client.navigate(targetUrl);
            return client.focus();
          }
        }
        // Otherwise open new window
        return self.clients.openWindow(targetUrl);
      }),
  );
});
