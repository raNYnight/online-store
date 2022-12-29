export function router(event: HashChangeEvent) {
  let newHash = event.newURL.slice(event.newURL.indexOf('#') + 1);
  console.log(newHash)
}