import { HeaderComponent } from '../components/header-component'
import { FooterComponent } from '../components/footer-component'
import { FilterComponent } from '../components/filter-component'
import { ProductsComponent } from '../components/products-component'
import { SortComponent } from '../components/sort-div-component'
import { myJson } from '..'
import { Product } from './interfaces'
import { makeFilteringObjectFromHash, myJsonWithFilters } from './filtering'
import { CartComponent } from '../components/cart-component'

export function build(page: string) {
  console.log(`func: build(${page})`)
  if (page === 'main') {
    document.body.innerHTML = '';
    document.body.prepend(new HeaderComponent().render())
    let aside = new FilterComponent();
    let sort = new SortComponent();
    let prods = new ProductsComponent();
    document.body.append(aside.renderObj());
    const main = document.createElement('main');
    main.append(sort.render(), prods.renderObj())
    main.className = 'main'
    document.body.append(main)
    document.body.append(new FooterComponent().render())
  } else if (page === 'cart') {
    console.log('cart page')
    document.body.innerHTML = '';
    document.body.prepend(new HeaderComponent().render())
    document.body.prepend(new CartComponent().render())
    document.body.append(new FooterComponent().render())

  } else if (page.startsWith('item/')) {
    console.log('item page')

  } else if (page.startsWith('filter/')) {
    let hash = window.location.hash.toString();
    let obj = makeFilteringObjectFromHash(hash)
    let myJsonNew = myJsonWithFilters(myJson, obj)
    build('main');
    const prods = new ProductsComponent;
    const products = document.querySelector('.products');
    products?.replaceWith(prods.renderObj(myJsonNew))
  } else {
    console.log('else (404?)')
  }
}

