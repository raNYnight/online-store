import './style.css'
import { App } from './modules/app';
import { Product } from './modules/interfaces';

export let myJson: Product[];

fetch('https://dummyjson.com/products?limit=100')
  .then(response => {
    response.json().then((value) => {
      myJson = value.products;
      const app = new App();
      app.run();
    })
  })
