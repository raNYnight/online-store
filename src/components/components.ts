import { myJson } from "..";
import { Product } from "../modules/interfaces";

export abstract class Component {
  container: HTMLElement;

  constructor(tagName: string, className: string, obj: Product[] | Product = myJson) {
    this.container = document.createElement(tagName);
    this.container.className = className;
  }

  render() {
    return this.container;
  }
  renderObj(obj: Product[]) {
    console.log(obj)
    return this.container;
  }
}

