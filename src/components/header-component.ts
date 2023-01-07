import { myJson } from "..";
import { resetFilteringObject } from "../modules/filtering";
import { CartItem, Product } from "../modules/interfaces";
import { Component } from "./components";

export class HeaderComponent extends Component {
  constructor(tagName: string = 'header', className: string = 'header container', obj: Product[] = myJson) {
    super(tagName, className, obj)
  }

  render() {
    let cartArr: CartItem[]
    let cartTotal = 0
    let cartItems = 0
    if (localStorage.cart) {
      cartArr = JSON.parse(localStorage.cart);
      cartTotal = cartArr.reduce(function (acc, el: CartItem) { return acc + el.price*el.count }, 0);
      cartItems = cartArr.reduce(function (acc, el: CartItem) { return acc + el.count }, 0);
    }

    const logoImg = document.createElement('img');
    logoImg.src = 'https://i.ibb.co/0DjfXtT/online-shop-high-resolution-logo-color-on-transparent-background.png';
    logoImg.alt = 'logo';
    logoImg.className = 'header__logo';
    logoImg.onclick = function () {
      resetFilteringObject()
      window.location.hash = 'main/'
    }

    const cartDiv = document.createElement('div');
    cartDiv.className = 'header__basket';
    cartDiv.onclick = function () {
      window.location.hash = 'cart'
    }

    const cartCount = document.createElement('div');
    cartCount.className = 'header__basket_items-count';
    cartCount.innerText = `${cartItems}`;

    const headerTotal = document.createElement('div');
    headerTotal.className = 'header__total';

    const headerTotalSpan = document.createElement('span');
    headerTotalSpan.innerText = 'TOTAL:'

    const headerTotalSum = document.createElement('span');
    headerTotalSum.className = 'header__total-sum'
    headerTotalSum.innerText = `${cartTotal}$`

    cartDiv.append(cartCount);
    headerTotal.append(headerTotalSpan, headerTotalSum)

    this.container.append(logoImg, cartDiv, headerTotal);
    return this.container;
  }
}