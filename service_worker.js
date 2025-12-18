const cache_name = "pong-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/sounds/bounce_blip.mp3",
  "/sounds/mouse_clicky.mp3",
  "/sounds/scored.mp3",
  "/sounds/victory.mp3",
  "/images/pong_game.png",
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cache_name).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(response => 
      response || fetch(event.request)
    )
  );
});