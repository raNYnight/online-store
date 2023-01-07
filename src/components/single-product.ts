import { myJson } from "..";
import { addRemoveToCartClick, addActiveClass, removeActiveClass } from "../modules/buttons";
import { FilteringObject, Product } from "../modules/interfaces";
import { Component } from "./components";
import { isIdInLocalStorage } from '../modules/cart'
import { filteringObject } from "../modules/filtering";

export class SingleComponent extends Component {
    constructor(tagName: string = 'div', className: string = 'single-item', obj: Product[] = myJson, filterObj: FilteringObject = filteringObject) {
        super(tagName, className, obj)
      }

      render(obj: Product[] = myJson, filterObj: FilteringObject = filteringObject) {
        const hash = window.location.hash,
              singleItemId = hash.slice(6,hash.length),
              item = myJson[+singleItemId - 1],
              itemNavigation = document.createElement('div'),
              itemTitle = document.createElement('div'),
              itemWrapper = document.createElement('div'),
              itemImages = document.createElement('div'),
              itemImagesList = document.createElement('div'),
              itemImageCurrent = document.createElement('img') as HTMLImageElement,
              itemSpecifications = document.createElement('div'),
              itemBuy = document.createElement('div')
        // console.log(item)
        itemTitle.classList.add('single-item__title')
        itemTitle.textContent = item.title

        itemNavigation.classList.add('single-item__navigation')
        itemNavigation.textContent = `STORE ➔ ${item.category.toUpperCase()} ➔ ${item.brand.toUpperCase()} ➔ ${item.title.toUpperCase()}`

        itemWrapper.classList.add('single-item__wrapper')
        itemWrapper.id = `product-${item.id}`
        itemWrapper.append(itemImages,itemSpecifications, itemBuy)
        itemSpecifications.classList.add('single-item__specifications')
        //IMAGES//
        // const imageURLS = this.getImagesArray(item.images).then()
        // setTimeout(()=> console.log(imageURLS,imageURLS.length), 1000)
        // console.log(imageURLS, imageURLS.length)
        itemImages.append(itemImagesList,itemImageCurrent)
        itemImages.classList.add('single-item__images')
        itemImagesList.classList.add('single-item__images-list')
        itemImageCurrent.classList.add('single-item__image_current')
        this.getSetImages(item.images, itemImageCurrent, itemImagesList)
        

        itemImagesList.addEventListener('click', (e) => {
            let target = e.target as HTMLImageElement
            // console.log(target)
            if(target.classList.contains('images-list__item')){
                let tmp = target.src
                target.src= itemImageCurrent.src
                itemImageCurrent.src= tmp
            }
        })

        //Specification//
        const specDescr = document.createElement('span'),
              specDescrTitle = document.createElement('span'),
              specDiscount = document.createElement('span'),
              specDiscountTitle = document.createElement('span'),
              specRating = document.createElement('span'),
              specRatingTitle = document.createElement('span'),
              specStock = document.createElement('span'),
              specStockTitle = document.createElement('span'),
              specBrand = document.createElement('span'),
              specBrandTitle = document.createElement('span'),
              specCategory = document.createElement('span'),
              specCategoryTitle = document.createElement('span'),
              specPrice = document.createElement('span')
        
        
        itemSpecifications.append(specDescrTitle,specDescr,
                                  specDiscountTitle,specDiscount,
                                  specRatingTitle,specRating,
                                  specStockTitle,specStock,
                                  specBrandTitle,specBrand,
                                  specCategoryTitle,specCategory)

        let specTitles = [specDescrTitle, specDiscountTitle, specRatingTitle, specStockTitle, specBrandTitle, specCategoryTitle].forEach(el => el.classList.add('specification-item__title'))
        let specValues = [specDescr, specDiscount, specRating, specStock, specBrand, specCategory].forEach(el => el.classList.add('specification-item__value'))
        specDescr.textContent = `${item.description}`
        specDescrTitle.textContent = `Description:`
        specDiscount.textContent = `${item.discountPercentage}`
        specDiscountTitle.textContent = `Discount %:`
        specRating.textContent = `${item.rating}`
        specRatingTitle.textContent = `Rating`
        specStock.textContent = `${item.stock}`
        specStockTitle.textContent = `Stock`
        specBrand.textContent = `${item.brand}`
        specBrandTitle.textContent = `Brand`
        specCategory.textContent = `${item.category}`
        specCategoryTitle.textContent = `Category`


        //Add to cart BUTTON//
        itemBuy.classList.add('single-item__buy')
        itemBuy.append(specPrice)
        specPrice.classList.add('single-item__price')
        specPrice.textContent = item.price.toString() + '$'
        const btnAddToCart = document.createElement('button');
        itemBuy.append(btnAddToCart)
        btnAddToCart.className = 'item__add-to-card btn';
        if(isIdInLocalStorage(item.id)){
            btnAddToCart.textContent = 'Remove from cart'
            addActiveClass(btnAddToCart)
        } else{
            btnAddToCart.textContent = 'Add to cart'
            removeActiveClass(btnAddToCart)
        }
        btnAddToCart.addEventListener('click', addRemoveToCartClick)

        //BYU NOW BUTTON//
        const btnBuy = document.createElement('button');
        btnBuy.classList.add('btn')
        itemBuy.append(btnBuy)
        btnBuy.textContent = 'Buy now'

          this.container.append(itemNavigation, itemTitle, itemWrapper)
          return this.container;
    }
   
    getSetImages(arr:Product["images"], current:HTMLImageElement, side:HTMLElement){
        let options = {
            method: 'HEAD',
          };
        let images:string[] = []
        let sizes:string[] = []
        let responsesArr:Promise<Response>[]= []
        arr.forEach(el=>responsesArr.push(fetch(el, options)))
        Promise.all(responsesArr).then(responses=> {
            responses.forEach((resp) => {
                let size:string = resp.headers.get('content-length')!.toString()
                let i = sizes.findIndex(x => x  === size)
                if(i <= -1){
                    sizes.push(size)
                    images.push(resp.url.toString())
                }
            })
        }).then(() => {
            current.src = images[0]
            for (let index = 1; index < images.length; index++) {
                            let element = images[index];
                            let imagesListItem = document.createElement('img')
                            side.append(imagesListItem)
                            imagesListItem.classList.add('images-list__item')
                            imagesListItem.src = element
                        }
        })

    }
}