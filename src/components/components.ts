import { myJson } from "..";
import { filteringObject } from "../modules/filtering";
import { FilteringObject, Product } from "../modules/interfaces";

export abstract class Component {
  container: HTMLElement;
  data: Product[];
  filter: FilteringObject;

  constructor(tagName: string, className: string, obj: Product[] = myJson, filterObj: FilteringObject = filteringObject) {
    this.container = document.createElement(tagName);
    this.container.className = className;
    this.data = obj;
    this.filter = filterObj
  }

  render(myJsonObj: Product[], filterObj: FilteringObject) {
    return this.container;
  }
}

