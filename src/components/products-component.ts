import { myJson } from "..";
import { Product } from "../modules/interfaces";
import { addRemoveToCartClick, itemDetailsClick } from "../modules/buttons";
import { Component } from "./components";
import { isIdInLocalStorage } from "../modules/cart";

export class ProductsComponent extends Component {
  constructor(tagName: string = 'section', className: string = 'products', obj: Product[] = myJson) {
    super(tagName, className, obj)
  }

  renderProducts(obj: Product[]) {
    console.log(`func: renderProducts`)
    let data = obj;

    for (let i: number = 0; i < data.length; i += 1) {
      const item = document.createElement('div');
      item.className = 'products__item';
      item.id = `product-${data[i].id}`
      item.style.backgroundImage = `url(${data[i].thumbnail})`
      item.style.backgroundSize = 'cover'
      // `url(${data[i].thumbnail}) 0% 0% / cover;`

      const itemHeader = document.createElement('span');
      itemHeader.className = 'products__item_header';
      itemHeader.innerText = data[i].title;

      // const itemImg = document.createElement('img');
      // itemImg.src = data[i].thumbnail;
      // itemImg.alt = 'image';
      // itemImg.className = 'products__item_img';

      const itemInfo = document.createElement('div');
      itemInfo.className = 'products__item_info';

      const itemCategory = document.createElement('span');
      itemCategory.className = 'item__category';
      itemCategory.innerText = `Category: ${data[i].category}`

      const itemBrand = document.createElement('span');
      itemBrand.className = 'item__brand';
      itemBrand.innerText = `Brand: ${data[i].brand}`

      const itemPrice = document.createElement('span');
      itemPrice.className = 'item__price';
      itemPrice.innerText = `Price: ${data[i].price}`

      // const itemDiscount = document.createElement('span');
      // itemDiscount.className = 'item__discount';
      // itemDiscount.innerText = `Discount: ${data[i].discountPercentage}`

      // const itemRating = document.createElement('span');
      // itemRating.className = 'item__rating';
      // itemRating.innerText = `Rating: ${data[i].rating}`

      // const itemStock = document.createElement('span');
      // itemStock.className = 'item__stock';
      // itemStock.innerText = `Stock: ${data[i].stock}`

      const itemButtons = document.createElement('div');
      itemButtons.className = 'products__item_buttons';

      const btnAddToCart = document.createElement('button');
      btnAddToCart.className = 'item__add-to-card btn';

      if (!isIdInLocalStorage(data[i].id)) {
        btnAddToCart.innerText = 'Add to cart';
      } else {
        btnAddToCart.innerText = 'Remove from cart';
        btnAddToCart.classList.add('active')
        item.classList.add('active')
      }
      btnAddToCart.addEventListener('click', addRemoveToCartClick);

      const btnInfo = document.createElement('button');
      btnInfo.className = 'item__info';
      btnInfo.innerText = 'Details';
      btnInfo.addEventListener('click', itemDetailsClick);

      itemButtons.append(btnAddToCart, btnInfo);
      itemInfo.append(itemCategory, itemBrand, itemPrice,); //itemDiscount, itemRating, itemStock);

      item.append(itemHeader, itemInfo, itemButtons)
      this.container.append(item);
    }
  }

  renderObj(obj: Product[] = myJson) {
    console.log(`func: renderObj`)
    this.renderProducts(obj);
    return this.container;
    
  }

}