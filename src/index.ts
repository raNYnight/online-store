import './style.css'
import { draw, drawFilterList } from './modules/draw'
import {addListenersToFilters} from './modules/filters'
import * as dualSlider from './modules/dual-slider'
console.log("Hello World!");

const searchInput = document.querySelector('#search') as HTMLInputElement
export const brandList = document.querySelector('#brands') as HTMLElement
export const categoryList = document.querySelector('#category-list') as HTMLElement




fetch('https://dummyjson.com/products?limit=100').then(res => res.json()).then(json =>{
    draw(json.products)
    drawFilterList(json.products, "brand", brandList)
    drawFilterList(json.products, "category", categoryList)
    addListenersToFilters(json.products)
    // console.log(json)
    


})


window.onload = function(){
   dualSlider.slideOne(dualSlider.stockSliderTrack,dualSlider.stockSliderOne,dualSlider.stockSliderTwo,dualSlider.stockValueOne,dualSlider.stockGap);
   dualSlider.slideTwo(dualSlider.stockSliderTrack,dualSlider.stockSliderOne,dualSlider.stockSliderTwo,dualSlider.stockValueTwo,dualSlider.stockGap);
   dualSlider.slideOne(dualSlider.priceSliderTrack,dualSlider.priceSliderOne,dualSlider.priceSliderTwo,dualSlider.priceValueOne,dualSlider.priceGap);
   dualSlider.slideTwo(dualSlider.priceSliderTrack,dualSlider.priceSliderOne,dualSlider.priceSliderTwo,dualSlider.priceValueTwo,dualSlider.priceGap);
}