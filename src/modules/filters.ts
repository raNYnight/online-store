import { draw, drawFilterList} from './draw'
import * as dualSlider from './dual-slider'
import {brandList, categoryList} from '../index'
import { FilteringObject, Product } from './interfaces'
import { makeHashFromfFilteringObject } from './router'


export let filteringObject: FilteringObject = {
  name: '',
  category: [],
  brand: [],
  minStock: 0,
  maxStock: 200,
  minPrice: 0,
  maxPrice: 2000,
}

const searchInput = document.querySelector('#search') as HTMLInputElement
const resetBTN = document.querySelector('.filter__reset') as HTMLButtonElement

export function addListenersToFilters (data:Product[]) {
  
  resetBTN.addEventListener('click', ()=>{
    resetFilter(data)
  })
    // search input
  searchInput.addEventListener('input', (event):void => {
    const target = event.target as HTMLInputElement;
    filteringObject.name = target.value
    let foundData:Product[] = globalFilter(data,filteringObject)
    draw(foundData)
    makeHashFromfFilteringObject();
  })
  // stock slider min
  dualSlider.stockSliderOne.addEventListener('input', (e:Event)=>{
    const target = e.target as HTMLInputElement;
    filteringObject.minStock = target.value;
    let foundData:Product[] = globalFilter(data,filteringObject)
    draw(foundData)
    dualSlider.slideOne(dualSlider.stockSliderTrack, dualSlider.stockSliderOne, dualSlider.stockSliderTwo, dualSlider.stockValueOne, dualSlider.stockGap)
    makeHashFromfFilteringObject();
  })
  // stock slider max
  dualSlider.stockSliderTwo.addEventListener('input', (e)=>{
    const target = e.target as HTMLTextAreaElement;
    filteringObject.maxStock = target.value
    let foundData:Product[] = globalFilter(data,filteringObject)
    draw(foundData)
    dualSlider.slideTwo(dualSlider.stockSliderTrack, dualSlider.stockSliderOne, dualSlider.stockSliderTwo, dualSlider.stockValueTwo, dualSlider.stockGap)
    makeHashFromfFilteringObject();
  })
  // price slider min
  dualSlider.priceSliderOne.addEventListener('input', (e)=>{
    const target = e.target as HTMLTextAreaElement;
    filteringObject.minPrice = target.value
    let foundData:Product[] = globalFilter(data,filteringObject)
    draw(foundData)
    dualSlider.slideOne(dualSlider.priceSliderTrack, dualSlider.priceSliderOne, dualSlider.priceSliderTwo, dualSlider.priceValueOne, dualSlider.priceGap)
    makeHashFromfFilteringObject();
  })
  // price slider max
  dualSlider.priceSliderTwo.addEventListener('input', (e)=>{
    const target = e.target as HTMLTextAreaElement;
    filteringObject.maxPrice = target.value
    let foundData:Product[] = globalFilter(data,filteringObject)
    draw(foundData)
    dualSlider.slideTwo(dualSlider.priceSliderTrack, dualSlider.priceSliderOne, dualSlider.priceSliderTwo, dualSlider.priceValueTwo, dualSlider.priceGap)
    makeHashFromfFilteringObject();
  })

}


export function resetFilter (data:Product[]){
  const checkboxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>
    filteringObject = {
      name: '',
      brand: [],
      category: [],
      minStock: 0,
      maxStock: 200,
      minPrice: 0,
      maxPrice:2000
  }
  searchInput.value = '';
  dualSlider.stockSliderOne.value = '0';
  dualSlider.stockSliderTwo.value = '200';
  dualSlider.priceSliderOne.value = '0';
  dualSlider.priceSliderTwo.value = '2000';
  dualSlider.slideOne(dualSlider.stockSliderTrack, dualSlider.stockSliderOne, dualSlider.stockSliderTwo, dualSlider.stockValueOne, dualSlider.stockGap);
  dualSlider.slideTwo(dualSlider.stockSliderTrack,dualSlider.stockSliderOne,dualSlider.stockSliderTwo,dualSlider.stockValueTwo,dualSlider.stockGap);
  dualSlider.slideOne(dualSlider.priceSliderTrack,dualSlider.priceSliderOne,dualSlider.priceSliderTwo,dualSlider.priceValueOne,dualSlider.priceGap);
  dualSlider.slideTwo(dualSlider.priceSliderTrack,dualSlider.priceSliderOne,dualSlider.priceSliderTwo,dualSlider.priceValueTwo,dualSlider.priceGap);

  draw(data);
  // drawFilterList(data, "brand", brandList);
  // drawFilterList(data, "category", categoryList);
  checkboxes.forEach((el:HTMLInputElement)=>el.checked = false)

  window.location.hash = '';
}

// filter in searchbox in header

  export function globalFilter (data:Product[], obj:FilteringObject) {
    console.log('filtering....')
    let result = data
    .filter( elem => {
      if (obj.brand.length > 0) return obj.brand.some( tag => elem.brand.includes(tag) )
      else return elem
    })
    .filter((elem) => {
      if (obj.category.length > 0) return obj.category.some( tag => elem.category.includes(tag) )
      else return elem
    })
    .filter(elem => {
      if (obj.name.length > 0){
        let filterSearch = obj.name.toLowerCase();
        let isTitleIncludes = elem.title.toLowerCase().includes(filterSearch)
        let isCategoryIncludes = elem.category.toLowerCase().includes(filterSearch)
        let isBrandIncludes = elem.brand.toLowerCase().includes(filterSearch)
        let isDescriptionIncludes = elem.description.toLowerCase().includes(filterSearch)
          if (isTitleIncludes || isCategoryIncludes || isBrandIncludes || isDescriptionIncludes) return elem;
      } else return elem
    })
    .filter((el) => el.stock >= Number(obj.minStock) && el.stock <= Number(obj.maxStock) && el.price >= Number(obj.minPrice) && el.price <= Number(obj.maxPrice));
    console.log(`filter object = `, obj)
    return result
  }
  
export function newFilteringByObject() {
  
}