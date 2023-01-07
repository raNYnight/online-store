import { myJson } from "..";
import { FilteringObject, Product } from "../modules/interfaces";
import { copyHref, filterClick } from "../modules/buttons";
import { Component } from "./components";
import { filteringObject, makeFilteringObjectFromHash, resetFilteringObject } from "../modules/filtering";

export class FilterComponent extends Component {
  constructor(tagName: string = 'aside', className: string = 'filter', obj: Product[] = myJson, filterObj: FilteringObject = filteringObject) {
    super(tagName, className, obj)
  }

  render(prod = myJson, filters: FilteringObject = filteringObject) {
    console.log(`FilterComponent.render`)
    console.log(filters)
    let filter = makeFilteringObjectFromHash(window.location.hash)
    /* * * * * * * * * */
    /*  reset+copy btn */
    /* * * * * * * * * */
    const filterItemBtns = document.createElement('div');
    filterItemBtns.className = 'filter__item btns';
    const filterItemBtnReset = document.createElement('button');
    filterItemBtnReset.className = 'filter__reset';
    filterItemBtnReset.id = 'filter__reset';
    filterItemBtnReset.innerText = 'Reset filters';
    filterItemBtnReset.addEventListener('click', resetFilteringObject);
    const filterItemBtnCopy = document.createElement('button');
    filterItemBtnCopy.className = 'filter__copy';
    filterItemBtnCopy.id = 'filter__copy';
    filterItemBtnCopy.innerText = 'Copy filters';

    filterItemBtnCopy.addEventListener('click', copyHref);
    filterItemBtns.append(filterItemBtnReset, filterItemBtnCopy)
    /* * * * * * * * * */
    /* !!!!!!!!!!!!!!! */
    /* * * * * * * * * */

    let categories = new Set();
    let brands = new Set();

    for (let i = 0; i < myJson.length; i++) {
      categories.add(myJson[i].category); // .toLowerCase()
      brands.add(myJson[i].brand); // .toLowerCase()
    }
    let categoriesArr = Array.from(categories);
    let brandsArr = Array.from(brands);

    /* * * * * * * * * */
    /* Category filter */
    /* * * * * * * * * */

    const filterItemCategory = document.createElement('div');
    filterItemCategory.className = 'filter__item categories';

    const filterTitleCategory = document.createElement('h2');
    filterTitleCategory.className = 'filter__title';
    filterTitleCategory.innerText = 'Category';

    const filterListCategory = document.createElement('div');
    filterListCategory.className = 'filter__list';
    filterListCategory.id = 'category-list';

    for (let i = 0; i < categoriesArr.length; i++) {
      const li = document.createElement('div');
      li.className = 'filter__list_item';
      const check = document.createElement('input');
      check.type = 'checkbox';
      check.name = 'category';
      check.id = `${categoriesArr[i]}`;
      check.addEventListener('input', filterClick);
       /////////////////////////////////////////////////////////////////////////////////////////
      if (filters.category.includes(`${categoriesArr[i]}`)) {
        check.checked = true
      }

      const label = document.createElement('label');
      label.innerText = `${categoriesArr[i]}`;
      label.setAttribute('for', `${categoriesArr[i]}`)

      li.append(check, label)
      filterListCategory.append(li)
    }

    filterItemCategory.append(filterTitleCategory, filterListCategory);
    /* * * * * * * * * */
    /*  Brand  filter  */
    /* * * * * * * * * */
    const filterItemBrand = document.createElement('div');
    filterItemBrand.className = 'filter__item brands';

    const filterTitleBrand = document.createElement('h2');
    filterTitleBrand.className = 'filter__title';
    filterTitleBrand.innerText = 'Brand';

    const filterListBrand = document.createElement('div');
    filterListBrand.className = 'filter__list';
    filterListBrand.id = 'brands';

    for (let i = 0; i < brandsArr.length; i++) {
      const li = document.createElement('div');
      li.className = 'filter__list_item';
      const check = document.createElement('input');
      check.type = 'checkbox';
      check.name = 'brand';
      check.id = `${brandsArr[i]}`;

      if (filters.brand.includes(`${brandsArr[i]}`)) {
        check.checked = true
      }

      const label = document.createElement('label');
      label.innerText = `${brandsArr[i]}`;
      label.setAttribute('for', `${brandsArr[i]}`)

      li.append(check, label)
      li.addEventListener('input', filterClick);
      filterListBrand.append(li)
    }

    filterItemBrand.append(filterTitleBrand, filterListBrand);
    /* * * * * * * * * */
    /*  Price  filter  */
    /* * * * * * * * * */
    const filterItemPrice = document.createElement('div');
    filterItemPrice.className = 'filter__item';

    const filterTitlePrice = document.createElement('h2');
    filterTitlePrice.className = 'filter__title';
    filterTitlePrice.innerText = 'Price';

    const dualSliderPrice = document.createElement('div');
    dualSliderPrice.className = 'dual-slider';

    const dualSliderPriceValues = document.createElement('div');
    dualSliderPriceValues.className = 'dual-slider__values';
    const priceRangeMin = document.createElement('span');
    priceRangeMin.id = 'price-range-min';
    priceRangeMin.innerText = `${filters.minPrice}`
    const priceRangeDash = document.createElement('span');
    priceRangeDash.innerHTML = '&dash;'
    const priceRangeMax = document.createElement('span');
    priceRangeMax.id = 'price-range-max';
    priceRangeMax.innerText = `${filters.maxPrice}`
    dualSliderPriceValues.append(priceRangeMin, priceRangeDash, priceRangeMax)

    const dualSliderPriceInput = document.createElement('div');
    dualSliderPriceInput.className = 'dual-slider__input';
    const priceSliderTrack = document.createElement('div');
    priceSliderTrack.className = 'price-slider__track';
    const priceSliderMin = document.createElement('input');
    const priceSliderMax = document.createElement('input');
    priceSliderMin.type = 'range';
    priceSliderMin.min = `0`;
    priceSliderMin.max = `2000`;
    priceSliderMin.value = `${filters.minPrice}`;
    priceSliderMin.id = 'price-slider-min';
    priceSliderMin.addEventListener('change', filterClick);
    priceSliderMin.addEventListener('input', (e: Event) => {
      this.slideOne(priceSliderMin, priceSliderMax, priceRangeMin, 10)
    })

    priceSliderMax.type = 'range';
    priceSliderMax.min = '0';
    priceSliderMax.max = '2000';
    priceSliderMax.value = `${filters.maxPrice}`;
    priceSliderMax.id = 'price-slider-max';
    priceSliderMax.addEventListener('change', filterClick);
    priceSliderMax.addEventListener('input', (e: Event) => {
      this.slideTwo(priceSliderMin, priceSliderMax, priceRangeMax, 10)
    })

    dualSliderPriceInput.append(priceSliderTrack, priceSliderMin, priceSliderMax)

    dualSliderPrice.append(dualSliderPriceValues, dualSliderPriceInput)

    filterItemPrice.append(filterTitlePrice, dualSliderPrice);
    /* * * * * * * * * */
    /*  Stock  filter  */
    /* * * * * * * * * */
    const filterItemStock = document.createElement('div');
    filterItemStock.className = 'filter__item';

    const filterTitleStock = document.createElement('h2');
    filterTitleStock.className = 'filter__title';
    filterTitleStock.innerText = 'Stock';

    const dualSliderStock = document.createElement('div');
    dualSliderStock.className = 'dual-slider';

    const dualSliderValuesStock = document.createElement('div');
    dualSliderValuesStock.className = 'dual-slider__values';
    const stockRangeMin = document.createElement('span');
    stockRangeMin.id = 'stock-range-min';
    stockRangeMin.innerText = `${filters.minStock}`
    const stockRangeDash = document.createElement('span');
    stockRangeDash.innerHTML = '&dash;'
    const stockRangeMax = document.createElement('span');
    stockRangeMax.id = 'stock-range-max';
    stockRangeMax.innerText = `${filters.maxStock}`
    dualSliderValuesStock.append(stockRangeMin, stockRangeDash, stockRangeMax)

    const dualSliderInputStock = document.createElement('div');
    dualSliderInputStock.className = 'dual-slider__input';
    const stockSliderTrack = document.createElement('div');
    stockSliderTrack.className = 'stock-slider__track';

    const stockSliderMin = document.createElement('input');
    const stockSliderMax = document.createElement('input');

    stockSliderMin.type = 'range';
    stockSliderMin.min = '0';
    stockSliderMin.max = '200';
    stockSliderMin.value = `${filters.minStock}`;
    stockSliderMin.id = 'stock-slider-min';
    stockSliderMin.addEventListener('click', filterClick);
    stockSliderMin.addEventListener('input', (e: Event) => {
      this.slideOne(stockSliderMin, stockSliderMax, stockRangeMin, 1)
    })


    stockSliderMax.type = 'range';
    stockSliderMax.min = '0';
    stockSliderMax.max = '200';
    stockSliderMax.value = `${filters.maxStock}`;
    stockSliderMax.id = 'stock-slider-max';
    stockSliderMax.addEventListener('click', filterClick);
    stockSliderMax.addEventListener('input', (e: Event) => {
      this.slideTwo(stockSliderMin, stockSliderMax, stockRangeMax, 1)
    })


    dualSliderInputStock.append(stockSliderTrack, stockSliderMin, stockSliderMax)

    dualSliderStock.append(dualSliderValuesStock, dualSliderInputStock)

    filterItemStock.append(filterTitleStock, dualSliderStock);

    this.container.append(filterItemBtns, filterItemCategory, filterItemBrand, filterItemPrice, filterItemStock);

    return this.container;
  }

  slideOne(range1: HTMLInputElement, range2: HTMLInputElement, valueBox: HTMLElement, gap: number) {
    if (parseInt(range2.value) - parseInt(range1.value) <= gap) {
      range1.value = (parseInt(range1.value) + gap).toString();
    }
    valueBox.textContent = range1.value;
  }

  slideTwo(range1: HTMLInputElement, range2: HTMLInputElement, valueBox: HTMLElement, gap: number) {
    if (parseInt(range2.value) - parseInt(range1.value) <= gap) {
      range2.value = (parseInt(range1.value) + gap).toString();
    }
    valueBox.textContent = range2.value;
  }

}