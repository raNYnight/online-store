import { changeFilteringObject, makeHashFromfFilteringObject } from "./filtering"
import { FilteringObject } from "./interfaces"
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

export function filterClick(event: any) { 
  console.log('func: filterClick')
  if (event.target.id.includes('slider')) {
    changeFilteringObject(event.target.id, event.target.value)
  } if (event.target.id.includes('search')) {
    changeFilteringObject(event.target.id, event.target.value)
  } else if (event.target.tagName === 'BUTTON') {
  } else {
    changeFilteringObject(event.target.name, event.target.id)
  }
  window.location.hash = (makeHashFromfFilteringObject(filteringObject))
}

export function itemDetailsClick(event: any) { 
  console.log('func: itemDetailsClick')
  console.log(event.target.parentNode.parentNode.parentNode)
  alert(event.target.parentNode.parentNode.parentNode.querySelector('.products__item_header').innerText)
}

export function addToCartClick(event: any) {
  console.log('func: addToCartClick')
  let item = event.target.parentNode.parentNode.parentNode.querySelector('.products__item_header').innerText
  localStorage.cart = item
}

export function copyFilteringObject() {
  console.log('func: copyFilteringObject')
  navigator.clipboard.writeText(window.location.href)
  alert(`page ${window.location.href} coppied into clipboard!`)
}
