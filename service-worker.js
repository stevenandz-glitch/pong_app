const cache_name = "pong-v1";

const BASE = self.location.pathname.replace(/\/[^\/]+$/, "/");
const ASSETS = [
  BASE + "index.html",
  BASE + "style.css",
  BASE + "script.js",
  BASE + "sounds/bounce_blip.mp3",
  BASE + "sounds/mouse_clicky.mp3",
  BASE + "sounds/scored.mp3",
  BASE + "sounds/victory.mp3",
  BASE + "images/pong_game.png",
  BASE + "manifest.json"
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