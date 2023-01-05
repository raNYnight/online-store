import { myJson } from ".."
import { HeaderComponent } from "../components/header-component"
import { changeFilteringObject, makeHashFromfFilteringObject } from "./filtering"
import { CartItem, FilteringObject, Product } from "./interfaces"
import { build } from "./page-builder"

export let filteringObject: FilteringObject = {
  name: '',
  category: [],
  brand: [],
  minStock: 0,
  maxStock: 200,
  minPrice: 0,
  maxPrice: 2000,
}

export function resetFilteringObject() {
  console.log('func: resetFilteringObject')
  filteringObject = {
    name: '',
    brand: [],
    category: [],
    minStock: 0,
    maxStock: 200,
    minPrice: 0,
    maxPrice: 2000
  }
  window.location.hash = 'main'
  build('main')
}

export function filterClick(event: Event) {
  const target = event.target as HTMLInputElement;
  console.log('func: filterClick')
  if (target.id.includes('slider')) {
    changeFilteringObject(target.id, target.value)
  } if (target.id.includes('search')) {
    changeFilteringObject(target.id, target.value)
  } else if (target.tagName === 'BUTTON') {
  } else {
    changeFilteringObject(target.name, target.id)
  }
  window.location.hash = (makeHashFromfFilteringObject(filteringObject))
}

export function itemDetailsClick(event: MouseEvent) {
  console.log('func: itemDetailsClick')
  const target = event.target as HTMLElement;
  const prod = target.parentNode?.parentNode as HTMLElement;
  const id = + prod.id.replace('product-', '')
  const item = myJson[id - 1]
  let res = ''
  for (let i in item) {
    res += (`${i}: ${item[i as keyof Product]} \n`)
  }
  alert(res)
  // alert(event.target.parentNode.parentNode.parentNode.querySelector('.products__item_header').innerText)
}


// Обновляем данные корзины(сумма покупок и кол-во) в localStorage и на странице

export function addRemoveToCartClick(event: Event) {
  const target = event.target as HTMLInputElement;
  let item = target.parentNode!.parentNode! as HTMLElement
  let itemId = +item.id.slice(8)
  let res = myJson.find((el) => el.id === itemId)
  let cartItem: CartItem = {
    id: res!.id,
    price: res!.price,
    count: 1,
  }
  switch (target.textContent) {
    case 'Add to card':
      target.textContent = 'Remove from card'
      item.classList.add('active')
      target.classList.add('active')
      if (!localStorage.cart) {
        let arr: CartItem[] = [];
        arr.push(cartItem)
        localStorage.cart = JSON.stringify(arr)
      } else {
        let arr = JSON.parse(localStorage.cart)
        arr.push(cartItem)
        localStorage.cart = JSON.stringify(arr)
      }
      break
    case 'Remove from card':
      target.textContent = 'Add to card'
      item.classList.remove('active')
      target.classList.remove('active')
      let arr = JSON.parse(localStorage.cart)
      localStorage.cart = JSON.stringify(arr.filter((el: CartItem) => el.id !== cartItem.id))
      break
  }
  console.log('func: addToCartClick')
  document.querySelector('.header')?.replaceWith(new HeaderComponent().render())

}

export function copyFilteringObject() {
  console.log('func: copyFilteringObject')
  navigator.clipboard.writeText(window.location.href)
  alert(`page ${window.location.href} coppied into clipboard!`)
}
