const CACHE_NAME = 'pwa-capability-tester-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        const responseClone = networkResponse.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone).catch(() => {})
        })
        return networkResponse
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request)
        return cachedResponse || Response.error()
      }),
  )
})
