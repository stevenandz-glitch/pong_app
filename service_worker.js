self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("pong-v1").then(cache => 
      cache.addAll([
        "/",
        "/index.html",
        "/style.css",
        "/script.js",
        "/sounds/",
        "/manifest.json"
      ])
    )
  );
});