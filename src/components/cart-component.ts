import { myJson } from "..";
import { cartItemBtnHandler, isIdInLocalStorage, objFromLocalStorage } from "../modules/cart";
import { Product } from "../modules/interfaces";
import { Component } from "./components";

export class CartComponent extends Component {
  constructor(tagName: string = 'div', className: string = 'cart', obj: Product[] = myJson) {
    super(tagName, className, obj)
  }

  renderPageCart() {
    const cartList = document.createElement('div');
    cartList.className = 'cart-list';
    /////////////// temp
    const temp = document.createElement('div');
    temp.className = 'temp';
    const tempText = document.createElement('p')
    tempText.innerHTML = 'заглушка для промокода';
    temp.append(tempText)
    /////////////// temp
    let itemNum = 0;
    for (let i: number = 0; i < myJson.length; i += 1) { 
      const product = myJson[i];
      if (isIdInLocalStorage(product.id)) {
        itemNum += 1;

        const cartItem = document.createElement('div');
        cartItem.className = `cart-item`;
        cartItem.id = `id-${product.id}`;

        const orderNum = document.createElement('div');
        orderNum.className = 'cart-item-order';
        orderNum.innerText = `${itemNum}`;

        const cartItemImg = document.createElement('img');
        cartItemImg.className = 'cart-item-img';
        cartItemImg.src = product.thumbnail;
        cartItemImg.alt = 'image';

        const cartItemAbout = document.createElement('div');
        cartItemAbout.className = 'cart-item-about';

        const cartItemName = document.createElement('p');
        cartItemName.className = 'cart-item-name';
        cartItemName.innerText = product.title

        const cartItemDesc = document.createElement('p');
        cartItemDesc.className = 'cart-item-desc';
        cartItemDesc.innerText = product.description;

        const cartItemRatingAndDiscount = document.createElement('div');
        cartItemRatingAndDiscount.className = 'cart-item-rad';
        const cartItemRating = document.createElement('span')
        cartItemRating.innerText = `Rating: ${product.rating}`
        const cartItemDiscount = document.createElement('span')
        cartItemDiscount.innerText = `Discount: ${product.discountPercentage}`

        const cartItemAside = document.createElement('div');
        cartItemAside.className = 'cart-item-aside';

        const cartItemStock = document.createElement('div');
        cartItemStock.className = 'cart-item-stock';
        cartItemStock.innerText = `Stock: ${product.stock}`;

        const cartItemPrice = document.createElement('div');
        cartItemPrice.className = 'cart-item-price';

        const itemTotalPrice = objFromLocalStorage(product.id);
        cartItemPrice.innerText = `$ ${product.price * itemTotalPrice!.count}`;

        const cartItemBtns = document.createElement('div');
        cartItemBtns.className = 'cart-item-btns';
        const cartItemBtnsAdd = document.createElement('button');
        cartItemBtnsAdd.className = 'cart-item-btn__add';
        cartItemBtnsAdd.innerText = '+';
        cartItemBtnsAdd.addEventListener('click', cartItemBtnHandler)
        
        const cartItemBtnsReduce = document.createElement('button');
        cartItemBtnsReduce.className = 'cart-item-btn__reduce';
        cartItemBtnsReduce.innerText = '-'
        cartItemBtnsReduce.addEventListener('click', cartItemBtnHandler)
        const cartItemBtnsCount = document.createElement('p');
        cartItemBtnsCount.className = 'cart-item-count';
        cartItemBtnsCount.innerText = `${itemTotalPrice!.count}`;

        cartItemRatingAndDiscount.append(cartItemRating,cartItemDiscount)
        cartItemBtns.append(cartItemBtnsReduce,cartItemBtnsCount,cartItemBtnsAdd)
        cartItemAside.append(cartItemStock,cartItemBtns,cartItemPrice)
        
        cartItemAbout.append(cartItemName, cartItemDesc,cartItemRatingAndDiscount)
        cartItem.append(orderNum, cartItemImg, cartItemAbout,cartItemAside)
        cartList.append(cartItem)
      }
    }
    this.container.append(cartList,temp);
  }

  render() {
    this.renderPageCart();
    return this.container;
  }

}