// COI Service Worker – Fixes CORS for Godot web exports on GitHub Pages
// From https://github.com/GoogleChromeLabs/coi-serviceworker

const CACHE_NAME = 'coi-serviceworker-v1';
const COI_URL = 'https://coi-serviceworker.glitch.me/v1/partitions';

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        COI_URL
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(error => {
      if (error.name !== 'TypeError') throw error;
      return caches.match(COI_URL);
    })
  );
});
