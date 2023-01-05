import { CartItem } from "./interfaces";
import { build } from "./page-builder";

export function isIdInLocalStorage(id: number) {
  if (localStorage.cart) {
    let cartArr: CartItem[]
    cartArr = JSON.parse(localStorage.cart);
    return !!(cartArr.find((el) => el.id === id))
  }
  return false
}

export function objFromLocalStorage(id: number) {
  let cartArr: CartItem[]
  cartArr = JSON.parse(localStorage.cart);
  return (cartArr.find((el) => el.id === id))
}

export function deleteObjFromLocalStorage(id: number) {
  console.log('deleteObjFromLocalStorage')
  let cartArr: CartItem[]
  cartArr = JSON.parse(localStorage.cart);
  localStorage.cart = JSON.stringify(cartArr.filter((el: CartItem) => el.id !== id))
}

export function changeObjAmountInLocalStorage(id: number, operator: string) {
  console.log('changeObjAmountInLocalStorage')
  let cartArr: CartItem[]
  cartArr = JSON.parse(localStorage.cart);
  switch (operator) {
    case '+':
      cartArr.forEach((val) => {
        if (val.id === id) {
          val.count += 1;
        }
        return val;
      })
      localStorage.cart = JSON.stringify(cartArr)
      break;
    case '-':
      cartArr.forEach((val) => {
        if (val.id === id) {
          if (val.count > 1) {
            val.count -= 1;
            localStorage.cart = JSON.stringify(cartArr)
          } else {
            val.count = 0;
            deleteObjFromLocalStorage(id)
          }
          }
        return val;
      })
      break;
  }
  build('cart')
}

export function cartItemBtnHandler(event: Event) {
  const target = event.target as HTMLElement;
  const product = target.parentNode!.parentNode!.parentNode as HTMLElement
  const productId = +product.id.slice(3)
  const operator = target.innerText
  console.log(operator)
  changeObjAmountInLocalStorage(productId, operator)
}