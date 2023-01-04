import './style.css'
import { App } from './modules/app';
import { Product } from './modules/interfaces';

export let myJson: Product[];
export let categories: [];
export let brands: [];
export let prices: {
  max: 0;
  min: 0;
}
export let stock: {
  max: 0;
  min: 0;
}

fetch('https://dummyjson.com/products?limit=100')
  .then(response => {
    response.json().then((value) => {
      myJson = value.products
      const app = new App();
      app.run();
    })
  })
