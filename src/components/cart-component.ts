import { myJson } from "..";
import { itemDetailsClick } from "../modules/buttons";
import { ObjectFromLocalStorage, cartItemBtnHandler, isIdInLocalStorage, objFromLocalStorage, promocodeHandler, promoList } from "../modules/cart";
import { Product, Promocode } from "../modules/interfaces";
import { build } from "../modules/page-builder";
import { Component } from "./components";
import { Modal } from "./modal-component";

export class CartComponent extends Component {
  constructor(tagName: string = 'main', className: string = 'cart', obj: Product[] = myJson) {
    super(tagName, className, obj)
  }

  render() {
    if (!!((new ObjectFromLocalStorage).cartTotal === 0)) { /* проверка на наличие товаров в корзине*/
      const emptyCart = document.createElement('section');
      emptyCart.className = 'empty-cart';
      emptyCart.innerText = 'cart is empty';
      this.container.append(emptyCart);
    } else {
      /////////////// promocode block
      const summary = document.createElement('section');
      summary.className = 'summary';

      const summaryList = document.createElement('div');
      summaryList.className = 'summary-list'

      const summaryHeader = document.createElement('p');
      summaryHeader.className = 'summary-header';
      summaryHeader.innerText = 'Summary'


      const productsAmount = document.createElement('div')
      productsAmount.className = 'products-amount'
      const productsAmountText = document.createElement('span')
      productsAmountText.innerText = 'Products: ';
      productsAmountText.className = 'summary-prop'
      const productsAmountValue = document.createElement('span')
      productsAmountValue.innerText = `${(new ObjectFromLocalStorage).cartItems}`;

      const productsTotal = document.createElement('div')
      productsTotal.className = 'products-total'
      const productsTotalText = document.createElement('span')
      productsTotalText.className = 'summary-prop'
      productsTotalText.innerText = 'Total price: ';
      const productsTotalValue = document.createElement('span')
      productsTotalValue.innerText = `$${(new ObjectFromLocalStorage).cartTotal.toFixed(2)}`;

      const productsNewTotal = document.createElement('div')
      productsNewTotal.className = 'products-new-total'

      if ((new ObjectFromLocalStorage).promoArr.length !== 0) {
        productsTotal.classList.add('line-through')
        const lsPromoArr: Promocode[] = (new ObjectFromLocalStorage).promoArr
        const discount = lsPromoArr.reduce((acc, ci) => acc + ci.disc, 0)
        const productsNewTotalText = document.createElement('span')
        productsNewTotalText.innerText = 'Total price: ';
        productsNewTotalText.className = 'summary-prop'
        const productsNewTotalValue = document.createElement('span')
        productsNewTotalValue.innerText = `$${((new ObjectFromLocalStorage).cartTotal / 100 * (100 - discount)).toFixed(2)}`;
        productsNewTotal.append(productsNewTotalText, productsNewTotalValue)
      }

      const promocodeDiv = document.createElement('div')
      promocodeDiv.className = 'promocode'

      if (localStorage.promo) {
        const lsPromoArr: Promocode[] = (new ObjectFromLocalStorage).promoArr
        const promoList = document.createElement('div')
        for (let i = 0; i < lsPromoArr.length; i++) {
          const promo = document.createElement('div');
          const promoText = document.createElement('p');
          promo.className = 'applied-promocode';
          promo.innerText = `${lsPromoArr[i].desc} - ${lsPromoArr[i].disc}%`
          const promoDelete = document.createElement('button')
          promoDelete.className = 'applied-promocode__remove-btn'
          promoDelete.innerText = 'x'

          promoDelete.addEventListener('click', function () {
            promocodeHandler(lsPromoArr[i].name)
            build('cart')
          } )
          promo.append(promoText,promoDelete)
          promoList.append(promo);
        }
        promocodeDiv.append(promoList);
      }

      const promocodeInput = document.createElement('input')
      promocodeInput.className = 'promocode-input';
      promocodeInput.type = 'search';
      promocodeInput.name = 'promocode';
      promocodeInput.id = 'promocode';
      promocodeInput.placeholder = 'Enter promo code';
      promocodeInput.autocomplete = "off";
      promocodeInput.value = ''
      promocodeInput.addEventListener('input', function (e) {
        let event = e as InputEvent;
        if (event.inputType === 'insertText') {
          const target = event.target as HTMLInputElement;
          if (['rsschool', 'epam23', 'rs'].includes(`${target.value.toLocaleLowerCase()}`)) {
            promoBtnClick(`${target.value.toLocaleLowerCase()}`)
          } else {
            document.getElementById('promo-div')?.replaceWith('')
          }
        } else {
          const target = event.target as HTMLInputElement;
          document.getElementById('promo-div')?.replaceWith('')
          if (['rsschool', 'epam23', 'rs'].includes(`${target.value.toLocaleLowerCase()}`)) {
            promoBtnClick(`${target.value.toLocaleLowerCase()}`)
          }
        }
      })
      function promoBtnClick(promocode: string) {
        const lsPromoArr: Promocode[] = (new ObjectFromLocalStorage).promoArr
        const promoDiv = document.createElement('div')
        promoDiv.id = 'promo-div'
        const promoDivText = document.createElement('span')
        promoDivText.className = 'promo-div-text'
        promoDivText.innerText = `Discount: ${(promoList.map((item) => {
          if (item.name === promocode) {
            return item.disc
          }
        }).join(''))}%`;
        const promoDivBtn = document.createElement('button')
        if (lsPromoArr.map((promo) => promo.name).includes(promocode)) {
          promoDivBtn.innerText = `remove`;
          promoDivBtn.className = 'promo-remove'
        } else {
          promoDivBtn.innerText = `add`;
          promoDivBtn.className = 'promo-add'
        }
        promoDivBtn.addEventListener('click', function () {
          let val = document.getElementById('promocode') as HTMLInputElement
          promocodeHandler(val.value)
          build('cart')
        })
        promoDiv.append(promoDivText,promoDivBtn)
        document.getElementById('promocode')?.parentElement?.append(promoDiv)
        
      }

      const promoHelp = document.createElement('p')
      promoHelp.className = 'promo-help'
      promoHelp.innerText = 'promo for test: "rsschool", "epam23", "rs"';

      const btnBuyNow = document.createElement('button')
      btnBuyNow.className = 'btn_buy'
      btnBuyNow.innerText = 'Buy now';
      btnBuyNow.addEventListener('click',()=> {
            let modal= new Modal()
            if(!document.querySelector('.modal')){
                document.body.appendChild(modal.render())
            }
             modal.openModal()
    } )

      promocodeDiv.append(promocodeInput)
      productsAmount.append(productsAmountText, productsAmountValue)
      productsTotal.append(productsTotalText, productsTotalValue)
      summaryList.append(productsAmount, productsTotal, productsNewTotal, promocodeDiv,promoHelp, btnBuyNow)
      summary.append(summaryHeader,summaryList)
      /////////////// items block
      const cartList = document.createElement('section');

      const cartListHeader = document.createElement('p');
      cartListHeader.className = 'products-in-cart';
      cartListHeader.innerText = 'Products in cart'
      cartList.append(cartListHeader)
      cartList.className = 'cart-list';
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
          cartItemImg.addEventListener('click', (event)=>{
            const target = event.target as HTMLElement;
            const prod = target.parentNode as HTMLElement;
            const id = + prod.id.replace('id-', '')
            window.location.hash = `item/${id}`
          })

          const cartItemAbout = document.createElement('div');
          cartItemAbout.className = 'cart-item-about';

          const cartItemName = document.createElement('p');
          cartItemName.className = 'cart-item-name';
          cartItemName.innerText = product.title
          cartItemName.addEventListener('click', (event)=>{
            const target = event.target as HTMLElement;
            const prod = target.parentNode?.parentNode as HTMLElement;
            const id = + prod.id.replace('id-', '')
            window.location.hash = `item/${id}`
          })
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

          cartItemRatingAndDiscount.append(cartItemRating, cartItemDiscount)
          cartItemBtns.append(cartItemBtnsReduce, cartItemBtnsCount, cartItemBtnsAdd)
          cartItemAside.append(cartItemStock, cartItemBtns, cartItemPrice)

          cartItemAbout.append(cartItemName, cartItemDesc, cartItemRatingAndDiscount)
          cartItem.append(orderNum, cartItemImg, cartItemAbout, cartItemAside)
          cartList.append(cartItem)
          
        }
      }
      this.container.append(cartList, summary);
    }


    return this.container;
  }
}