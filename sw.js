self.addEventListener('fetch', ev => {
  console.log(ev.request.url)
  ev.respondWith(fetch(ev.request))
})
