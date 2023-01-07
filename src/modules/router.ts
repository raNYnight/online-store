import { build } from "./page-builder";

export function router(event: HashChangeEvent) { // срабатывает при изменении хэша
  // console.log(`newURL: ${event.newURL}`)
  let hash = window.location.hash.slice(1);
  build(hash);
}
