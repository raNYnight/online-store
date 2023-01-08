import { HeaderComponent } from '../components/header-component'
import { FooterComponent } from '../components/footer-component'
import { FilterComponent } from '../components/aside-component'
import { ProductsComponent } from '../components/products-component'
import { SortComponent } from '../components/sort-div-component'
import { myJson } from '..'
import { filteringObject, makeFilteringObjectFromHash, myJsonWithFilters } from './filtering'
import { CartComponent } from '../components/cart-component'
import { SingleComponent } from '../components/single-product'
import { ErrorComponent } from '../components/error-component'

export function build(page: string) {
  // console.log(`func: build(${page})`)
  document.body.innerHTML = '';
  document.body.append(new HeaderComponent().render())
  if (page.startsWith('main/')) { 
    makeFilteringObjectFromHash(window.location.hash.toString())
    let myJsonNew = myJsonWithFilters(myJson, filteringObject)
    document.body.innerHTML = '';
    document.body.append(new HeaderComponent().render())
    document.body.append(new FilterComponent().render(myJson, filteringObject));
    const main = document.createElement('main');
    main.append(new SortComponent().render(myJson, filteringObject))
    main.append(new ProductsComponent().render())
    main.className = 'main'
    document.body.append(main);
    (document.querySelector('#found_products') as HTMLElement).innerText = `${myJsonNew.length}`;
  } else if (page === 'cart') {
    document.body.append(new CartComponent().render())
  } else if (page.startsWith('item/')) {
    document.body.append(new SingleComponent().render())
  } else {
    document.body.append(new ErrorComponent().render())
  }
    document.body.append(new FooterComponent().render())
}

