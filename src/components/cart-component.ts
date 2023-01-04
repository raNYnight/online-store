import { myJson } from "..";
import { Product } from "../modules/interfaces";
import { Component } from "./components";

export class CartComponent extends Component {
  constructor(tagName: string = 'div', className: string = 'cart', obj: Product[] = myJson) {
    super(tagName, className, obj)
  }

  renderPageCart() {
    const cart = document.createElement('span');
    cart.innerText = 'cart placeholder'
   
    this.container.append(cart);
  }

  render() {
    this.renderPageCart();
    return this.container;
  }

}