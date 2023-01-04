import { myJson } from "..";
import { Product } from "../modules/interfaces";
import { Component } from "./components";

export class HeaderComponent extends Component {
  constructor(tagName: string = 'header', className: string = 'header container',obj: Product[] = myJson) {
    super(tagName, className, obj)
  }

  renderPageHeader() {
    const logoImg = document.createElement('img');
    logoImg.src = 'https://i.ibb.co/0DjfXtT/online-shop-high-resolution-logo-color-on-transparent-background.png';
    logoImg.alt = 'logo';
    logoImg.className = 'header__logo';
    logoImg.onclick = function () {
      window.location.href = 'http://localhost:8080/#main'
    } 

    const cartDiv = document.createElement('div');
    cartDiv.className = 'header__basket';
    cartDiv.onclick = function () {
      window.location.href = 'http://localhost:8080/#cart'
    } 

    const cartCount = document.createElement('div');
    cartCount.className = 'header__basket_items-count';
    cartCount.innerText = '0';

    const headerTotal = document.createElement('div');
    headerTotal.className = 'header__total';

    const headerTotalSpan = document.createElement('span');
    headerTotalSpan.innerText = 'TOTAL:'

    const headerTotalSum = document.createElement('span');
    headerTotalSum.className = 'header__total-sum'
    headerTotalSum.innerText = '0$'

    cartDiv.append(cartCount);
    headerTotal.append(headerTotalSpan, headerTotalSum)

    this.container.append(logoImg, cartDiv, headerTotal);
  }

  render() {
    this.renderPageHeader();
    return this.container;
  }

}