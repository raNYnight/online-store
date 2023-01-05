import { CartItem } from "./interfaces";

export function isIdInLocalStorage(id: number) {
  if (localStorage.cart) {
    let cartArr: CartItem[]
    cartArr = JSON.parse(localStorage.cart);
    return !!(cartArr.find((el) => el.id === id))
  }
  return false
}
