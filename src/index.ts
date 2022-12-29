import './style.css'
import { draw, drawFilterList } from './modules/draw'
import {addListenersToFilters} from './modules/filters'
import * as dualSlider from './modules/dual-slider'
import { fetchJSON } from './modules/fetch';
import { router } from './modules/router';
import { buildPage } from './modules/build-page';

const searchInput = document.querySelector('#search') as HTMLInputElement
export const brandList = document.querySelector('#brands') as HTMLElement
export const categoryList = document.querySelector('#category-list') as HTMLElement


const getData = fetchJSON('https://dummyjson.com/products?limit=100');

getData.then((myJSON) => {
    draw(myJSON);
    drawFilterList(myJSON, "brand", brandList);
    drawFilterList(myJSON, "category", categoryList);
    addListenersToFilters(myJSON);
})

window.onload = function(){
   dualSlider.slideOne(dualSlider.stockSliderTrack,dualSlider.stockSliderOne,dualSlider.stockSliderTwo,dualSlider.stockValueOne,dualSlider.stockGap);
   dualSlider.slideTwo(dualSlider.stockSliderTrack,dualSlider.stockSliderOne,dualSlider.stockSliderTwo,dualSlider.stockValueTwo,dualSlider.stockGap);
   dualSlider.slideOne(dualSlider.priceSliderTrack,dualSlider.priceSliderOne,dualSlider.priceSliderTwo,dualSlider.priceValueOne,dualSlider.priceGap);
   dualSlider.slideTwo(dualSlider.priceSliderTrack,dualSlider.priceSliderOne,dualSlider.priceSliderTwo,dualSlider.priceValueTwo,dualSlider.priceGap);
}

window.addEventListener("hashchange", router);

buildPage(window.location.hash.slice(1))

