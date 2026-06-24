/* Manual EPR — PW2037 · service worker
   Strategy: cache-first for the in-scope app shell so the tool runs forever
   offline after first load. Cross-origin requests (weather API / CORS proxy)
   are passed straight to the network and never cached, so a failed or absent
   weather pull can never break the offline app. */

const CACHE = "tmc-epr-v1.1.1";

const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./maskable-512.png",
  "./icon-180.png",
  "./favicon-32.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      // addAll fails the whole install if one URL 404s; add individually instead.
      Promise.all(SHELL.map((u) => c.add(u).catch(() => null)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const inScope = url.pathname.startsWith(self.registration.scope.replace(self.location.origin, ""))
                  || url.href.startsWith(self.registration.scope);

  // Weather API / CORS proxy / anything cross-origin: straight to network, no caching.
  if (!sameOrigin || !inScope) {
    return; // let the browser handle it normally
  }

  // App shell: cache-first, fall back to network, then to cached index for navigations.
  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req)
        .then((resp) => {
          if (resp && resp.ok && resp.type === "basic") {
            const copy = resp.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return resp;
        })
        .catch(() => {
          if (req.mode === "navigate") return caches.match("./index.html");
        });
    })
  );
});
