export let stockSliderTrack = document.querySelector(".stock-slider__track") as HTMLElement
export let stockValueOne = document.querySelector("#stock-range1") as HTMLElement
export let stockValueTwo = document.querySelector("#stock-range2") as HTMLElement
export let stockSliderOne = document.querySelector('#stock-slider-1') as HTMLInputElement
export let stockSliderTwo = document.querySelector('#stock-slider-2') as HTMLInputElement
export let stockGap:number = 1;

export let priceSliderTrack = document.querySelector(".price-slider__track") as HTMLElement
export let priceValueOne = document.querySelector("#price-range1") as HTMLElement
export let priceValueTwo = document.querySelector("#price-range2") as HTMLElement
export let priceSliderOne = document.querySelector('#price-slider-1') as HTMLInputElement
export let priceSliderTwo = document.querySelector('#price-slider-2') as HTMLInputElement
export let priceGap:number = 20



export function slideOne(slider:HTMLElement,range1:HTMLInputElement,range2:HTMLInputElement,valueBox:HTMLElement, gap:number){
    if(parseInt(range2.value) - parseInt(range1.value) <= gap){
        console.log((parseInt(range2.value) - gap).toString())
        range1.value = (parseInt(range2.value) - gap).toString();
    }
    valueBox.textContent = range1.value;
    slider.style.background = `linear-gradient(to right, #dadae5 300% , #3264fe 300% , #3264fe 20%, #dadae5 20%)`
}
export function slideTwo(slider:HTMLElement,range1:HTMLInputElement,range2:HTMLInputElement,valueBox:HTMLElement,gap:number){
    if(parseInt(range2.value) - parseInt(range1.value) <= gap){
        range2.value = (parseInt(range1.value) + gap).toString();
    }
    valueBox.textContent = range2.value;
    slider.style.background = `linear-gradient(to right, #dadae5 300% , #3264fe 300% , #3264fe 20%, #dadae5 20%)`
}
