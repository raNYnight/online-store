import { myJson } from ".."
import { changeFilteringObject, makeHashFromfFilteringObject } from "./filtering"
import { FilteringObject, Product } from "./interfaces"
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
  let res =''
  for (let i in item) {
    res += (`${i}: ${item[i as keyof Product]} \n`)
  }
  alert(res)
  // alert(event.target.parentNode.parentNode.parentNode.querySelector('.products__item_header').innerText)
}


// Обновляем данные корзины(сумма покупок и кол-во) в localStorage и на странице

export function addRemoveToCartClick(event: Event) {
  const target = event.target as HTMLInputElement;
  let item = target.parentNode!.parentNode!.querySelector('.products__item_header') as HTMLElement
  let itemPrice = target.parentNode!.parentNode!.querySelector('.item__price')!.textContent!.split(': ')[1]
  let basketCount = document.querySelector(".header__basket_items-count") as HTMLElement
  let basketSumHTML = document.querySelector('.header__total-sum') as HTMLElement
  localStorage.price = basketSumHTML.textContent
  switch(target.textContent){
    case 'Add to card':
      target.textContent = 'Remove from card'
      basketCount.textContent = (parseInt(basketCount.textContent!) + 1).toString();
      localStorage.price = parseInt(itemPrice) + parseInt(localStorage.price) 
      basketSumHTML.textContent = `${localStorage.price}$`
      if (!localStorage.cart){
        localStorage.cart = item.innerText
      } else {
        localStorage.cart += `,${item.innerText}`
      }
      break
    case 'Remove from card':
      target.textContent = 'Add to card'
      basketCount.textContent = (parseInt(basketCount.textContent!) - 1).toString();
      localStorage.price = parseInt(localStorage.price) - parseInt(itemPrice) 
      basketSumHTML.textContent = `${localStorage.price}$`

      let lsArr:string[] = localStorage.cart.split(',')
      lsArr.splice(lsArr.indexOf(item.innerText), 1)
      localStorage.cart = lsArr.join(',')
      break
  }

  console.log('func: addToCartClick')
  
  console.log('added to cart: ',item.textContent, itemPrice)
}

export function copyFilteringObject() {
  console.log('func: copyFilteringObject')
  navigator.clipboard.writeText(window.location.href)
  alert(`page ${window.location.href} coppied into clipboard!`)
}
