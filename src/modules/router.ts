import { build } from "./page-builder";

export function router(event: HashChangeEvent) { // срабатывает при изменении хэша
  console.log('func: router')
  let hash = window.location.hash.slice(1);
  build(hash);
}
