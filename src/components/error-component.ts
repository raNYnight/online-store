import { myJson } from "..";
import { Product } from "../modules/interfaces";
import { Component } from "./components";

export class ErrorComponent extends Component {
  constructor(tagName: string = 'error', className: string = 'error', obj: Product[] = myJson) {
    super(tagName, className, obj)
  }

  renderPageError() {
    const error = document.createElement('span');
    error.innerText = 'there is no such page'
   
    this.container.append(error);
  }

  render() {
    this.renderPageError();
    return this.container;
  }

}