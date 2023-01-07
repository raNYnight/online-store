import { myJson } from "..";
import { FilteringObject, Product } from "../modules/interfaces";
import { filterClick } from "../modules/buttons";
import { Component } from "./components";
import { filteringObject } from "../modules/filtering";

export class SortComponent extends Component {
  constructor(tagName: string = 'div', className: string = 'sort', obj: Product[] = myJson, filterObj: FilteringObject = filteringObject) {
    super(tagName, className, obj)
  }

  render(myJsonObj: Product[], filterObj: FilteringObject) {
    const sortDiv = document.createElement('div');
    sortDiv.className = 'products__sort';

    const sortSettings = document.createElement('div');
    sortSettings.className = 'products__sort-settings';

    const sort = document.createElement('select');
    sort.name = ('sort');
    sort.id = 'sorting';
    sort.addEventListener('input', filterClick)

    const sortDefault = document.createElement('option');
    sortDefault.value = 'unsorted';
    sortDefault.innerText = '--Sort options--';
    if (filteringObject.sort !== '') {
      sortDefault.selected = true
      sortDefault.disabled = true
    }

    const priceDown = document.createElement('option');
    priceDown.value = 'price🠗';
    priceDown.innerText = 'Sort by price 🠗';
    if (filteringObject.sort === priceDown.value) {
      priceDown.selected = true
    }

    const priceUp = document.createElement('option');
    priceUp.value = 'price🠕';
    priceUp.innerText = 'Sort by price 🠕';
    if (filteringObject.sort === priceUp.value) {
      priceUp.selected = true
    }

    const ratingDown = document.createElement('option');
    ratingDown.value = 'rating🠗';
    ratingDown.innerText = 'Sort by rating 🠗';
    if (filteringObject.sort === ratingDown.value) {
      ratingDown.selected = true
    }

    const ratingUp = document.createElement('option');
    ratingUp.value = 'rating🠕';
    ratingUp.innerText = 'Sort by rating 🠕';
    if (filteringObject.sort === ratingUp.value) {
      ratingUp.selected = true
    }

    sort.append(sortDefault, priceDown, priceUp, ratingDown, ratingUp)
    sortSettings.append(sort);

    const sortFound = document.createElement('div');
    sortFound.className = 'items-found';
    const sortFoundSpan1 = document.createElement('span');
    sortFoundSpan1.innerText = 'Products found:';
    const sortFoundSpan2 = document.createElement('span');
    sortFoundSpan2.id = 'found_products';
    sortFoundSpan2.innerText = `${myJsonObj.length}`;
    sortFound.append(sortFoundSpan1, sortFoundSpan2)

    const search = document.createElement('div');
    search.className = 'header__search';

    const searchInput = document.createElement('input');
    searchInput.className = 'header__search-input';
    searchInput.type = 'search';
    searchInput.name = 'search';
    searchInput.id = 'search';
    searchInput.placeholder = 'Search on Online shop!';
    searchInput.autocomplete = "off";
    searchInput.value = filterObj.name
    searchInput.addEventListener('input', filterClick)

    search.append(searchInput);

    const sortView = document.createElement('div');
    sortView.className = 'products__sort_view';
    const largeBar = document.createElement('div');
    largeBar.className = 'bar large-bar'
    const smallBar = document.createElement('div');
    smallBar.className = 'bar small-bar'
    sortView.append(largeBar, smallBar);

    sortDiv.append(sortSettings, search, sortFound, sortView)
    this.container.append(sortDiv)

    return this.container;
  }
}