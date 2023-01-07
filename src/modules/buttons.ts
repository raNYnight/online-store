import { myJson } from ".."
import { HeaderComponent } from "../components/header-component"
import { changeFilteringObject, filteringObject, makeHashFromfFilteringObject } from "./filtering"
import { CartItem, Product } from "./interfaces"




export function filterClick(event: Event) {
  const target = event.target as HTMLInputElement;
  console.log('func: filterClick')
  console.log(filteringObject)
  if (target.id.includes('slider')) {
    changeFilteringObject(target.id, target.value)
  } if (target.id.includes('search')) {
    changeFilteringObject(target.id, target.value)
    setTimeout(() => {
      let search = document.getElementById('search') as HTMLElement;
      search.focus();
    }, 100)
   
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
  window.location.hash = `item/${id}`
}

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
    case 'Add to cart':
      target.textContent = 'Remove from cart'
      if(item.classList.contains('products__item')){
        addActiveClass(item)
      }
      addActiveClass(target)
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
    case 'Remove from cart':
      target.textContent = 'Add to cart'
      if(item.classList.contains('products__item')){
        removeActiveClass(item)
      }
      removeActiveClass(target)
      let arr = JSON.parse(localStorage.cart)
      localStorage.cart = JSON.stringify(arr.filter((el: CartItem) => el.id !== cartItem.id))
      break
  }
  console.log('func: addToCartClick')
  document.querySelector('.header')?.replaceWith(new HeaderComponent().render())

}

export const addActiveClass = (parent:HTMLElement) => parent.classList.add('active')
export const removeActiveClass = (parent:HTMLElement) => parent.classList.remove('active')


export function copyHref() {
  console.log('func: copyHref')
  navigator.clipboard.writeText(window.location.href)
  alert(`page ${window.location.href} coppied into clipboard!`)
}
