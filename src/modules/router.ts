import { myJson } from "..";
import { ProductsComponent } from "../components/products-component";
import { makeFilteringObjectFromHash, myJsonWithFilters } from "./filtering";
import { build } from "./page-builder";

export function router(event: HashChangeEvent) { // срабатывает при изменении хэша
  console.log('func: router')
  let hash = window.location.hash.slice(1);
  let isnotBuilded = !document.querySelector('.products');
  if (hash.startsWith('filter')) {
    if (isnotBuilded) {
      build(hash);
    } else {
      let prods = new ProductsComponent;
      let hash = window.location.hash.toString();
      let obj = makeFilteringObjectFromHash(hash)
      let myJsonNew = myJsonWithFilters(myJson, obj)
      let newJson = prods.renderObj(myJsonNew)
      document.querySelector('.products')?.replaceWith(newJson);
    }
  } else {
    build(hash);
  }
}
