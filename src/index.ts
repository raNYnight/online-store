import './style.css'
import { draw, product } from './modules/draw'
import {filtered, filterNumber, filterStrings} from './modules/filters'
import * as dualSlider from './modules/dual-slider'
console.log("Hello World!");

const searchInput = document.querySelector('#search') as HTMLInputElement


interface EventTarget {
    target: HTMLInputElement;
  }


fetch('https://dummyjson.com/products?limit=100').then(res => res.json()).then(json =>{
    draw(json.products)
    let max = 1000;
    for(let i:number = 0; i < json.products.length;i++){
        if(json.products[i].price > max){
            max = json.products[i].price
        }
        console.log(max)
    }
    // console.log(json)
    searchInput.addEventListener('input', (event):void => {
        const target = event.target as HTMLTextAreaElement;
        let foundData:product[] = filterStrings(json.products, 'title', target.value)
        draw(foundData)
    })


    // sliderOne.addEventListener("input", (e) => {
    //     filterByNum(res.products, "stock", e.target.value, sliderTwo.value);
    //     console.log(`slider1 vaue = `, e.target.value);
    //   });
  
    //   sliderTwo.addEventListener("input", (e) => {
    //     filterByNum(res.products, "stock", sliderOne.value, e.target.value);
    //     console.log(`slider2 vaue = `, e.target.value);
    //   });
    dualSlider.stockSliderOne.addEventListener('input', (e:Event)=>{
        const target = e.target as HTMLTextAreaElement;
        let foundData:product[] = filterNumber(json.products, "stock", target.value, dualSlider.stockSliderTwo.value);
        draw(foundData)
        dualSlider.slideOne(dualSlider.stockSliderTrack,dualSlider.stockSliderOne,dualSlider.stockSliderTwo,dualSlider.stockValueOne,dualSlider.stockGap)
    })
    dualSlider.stockSliderTwo.addEventListener('input', (e)=>{
        const target = e.target as HTMLTextAreaElement;
       let foundData:product[] =  filterNumber(json.products, "stock", dualSlider.stockSliderOne.value, target.value);
       draw(foundData)
        dualSlider.slideTwo(dualSlider.stockSliderTrack,dualSlider.stockSliderOne,dualSlider.stockSliderTwo,dualSlider.stockValueTwo,dualSlider.stockGap)
    })
    dualSlider.priceSliderOne.addEventListener('input', (e)=>{
        const target = e.target as HTMLTextAreaElement;
       let foundData:product[] =  filterNumber(json.products, "price", target.value, dualSlider.priceSliderTwo.value);
       draw(foundData)
        dualSlider.slideOne(dualSlider.priceSliderTrack,dualSlider.priceSliderOne,dualSlider.priceSliderTwo,dualSlider.priceValueOne,dualSlider.priceGap)
    })
    dualSlider.priceSliderTwo.addEventListener('input', (e)=>{
        const target = e.target as HTMLTextAreaElement;
       let foundData:product[] =  filterNumber(json.products, "price", dualSlider.priceSliderOne.value, target.value);
       draw(foundData)
        dualSlider.slideTwo(dualSlider.priceSliderTrack,dualSlider.priceSliderOne,dualSlider.priceSliderTwo,dualSlider.priceValueTwo,dualSlider.priceGap)
    })


})


window.onload = function(){
   dualSlider.slideOne(dualSlider.stockSliderTrack,dualSlider.stockSliderOne,dualSlider.stockSliderTwo,dualSlider.stockValueOne,dualSlider.stockGap);
   dualSlider.slideTwo(dualSlider.stockSliderTrack,dualSlider.stockSliderOne,dualSlider.stockSliderTwo,dualSlider.stockValueTwo,dualSlider.stockGap);
   dualSlider.slideOne(dualSlider.priceSliderTrack,dualSlider.priceSliderOne,dualSlider.priceSliderTwo,dualSlider.priceValueOne,dualSlider.priceGap);
   dualSlider.slideTwo(dualSlider.priceSliderTrack,dualSlider.priceSliderOne,dualSlider.priceSliderTwo,dualSlider.priceValueTwo,dualSlider.priceGap);
}