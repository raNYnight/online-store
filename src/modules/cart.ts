import { myJson } from "..";
import { CartItem, Promocode } from "./interfaces";
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
  // console.log('deleteObjFromLocalStorage')
  let cartArr: CartItem[]
  cartArr = JSON.parse(localStorage.cart);
  localStorage.cart = JSON.stringify(cartArr.filter((el: CartItem) => el.id !== id))
}

export function changeObjAmountInLocalStorage(id: number, operator: string) {
  // console.log('changeObjAmountInLocalStorage')
  let cartArr: CartItem[]
  cartArr = JSON.parse(localStorage.cart);
  switch (operator) {
    case '+':
      cartArr.forEach((val) => {
        if (val.id === id) {
          if (val.count < myJson.find((el) => el.id === id)!.stock) { /////////////////////// 
            val.count += 1;
          }
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
  // console.log(operator)
  changeObjAmountInLocalStorage(productId, operator)
}
export const promoList: Promocode[] = [
  {
    name: 'rs',
    desc: 'RS School',
    disc: 5,
  },
  {
    name: 'epam23',
    desc: 'EPAM Systems',
    disc: 10,
  },
  {
    name: 'rsschool',
    desc: 'Rolling Scopes School',
    disc: 15,
  },
]

export function promocodeHandler(promocode: string) {
  let promoArr: Promocode[] = localStorage.promo ? JSON.parse(localStorage.promo) : [];
  let promoIsInLocalStorage = promoArr.map((promo) => promo.name).includes(promocode)
  if (!promoIsInLocalStorage) {
    const promo = promoList.filter((promo) => promocode === promo.name)
    promoArr.push(...promo)
  } else {
    promoArr = promoArr.filter((el) => el.name !== promocode)
  }
  localStorage.promo = JSON.stringify(promoArr)
}

export class ObjectFromLocalStorage {
  constructor() {
    if (!!localStorage.cart) {
      this.cartArr = JSON.parse(localStorage.cart);
      this.cartTotal = this.cartArr.reduce(function (acc, el: CartItem) { return acc + el.price * el.count }, 0);
      this.cartItems = this.cartArr.reduce(function (acc, el: CartItem) { return acc + el.count }, 0);
    } else {
      this.cartArr = [];
      this.cartTotal = 0
      this.cartItems = 0
    }
    if (localStorage.promo) {
      this.promoArr = JSON.parse(localStorage.promo);
    } else {
      this.promoArr = []
    }

  }
  public cartArr: [];
  public cartTotal: number;
  public cartItems: number;
  public promoArr: []
}