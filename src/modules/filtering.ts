import { filteringObject, resetFilteringObject } from "./buttons";
import { FilteringObject, Product } from "./interfaces";

export function changeFilteringObject(prop: string, value: string) { // from filters
  console.log('func: changeFilteringObject')
  if (prop === 'filter__reset') {
    resetFilteringObject()
  } else if (prop === 'category') {
    if (filteringObject.category.includes(value)) {
      filteringObject.category.splice(filteringObject.category.indexOf(value), 1)
    } else {
      filteringObject.category.push(value)
    }
  } else if (prop === 'brand') {
    if (filteringObject.brand.includes(value)) {
      filteringObject.brand.splice(filteringObject.brand.indexOf(value), 1)
    } else {
      filteringObject.brand.push(value)
    }
  } else if (prop === 'price-slider-min') {
    filteringObject.minPrice = +value;
  } else if (prop === 'price-slider-max') {
    filteringObject.maxPrice = +value;
  } else if (prop === 'stock-slider-min') {
    filteringObject.minStock = +value;
  } else if (prop === 'stock-slider-max') {
    filteringObject.maxStock = +value;
  } else if (prop === 'search') {
    filteringObject.name = value;
  }
}

export function myJsonWithFilters(data: Product[], obj: FilteringObject) {
  console.log('func: myJsonWithFilters')
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
  return result
}

export function makeHashFromfFilteringObject(filteringObject: FilteringObject) {
  console.log('func: makeHashFromfFilteringObject')
  let arr = [];
  if (filteringObject.name !== '') {
    arr.push(`name=${filteringObject.name}`)
  } 
  if (filteringObject.category.length !== 0) {
    arr.push(`category=${filteringObject.category}`)
  } 
  if (filteringObject.brand.length !== 0) {
    arr.push(`brand=${filteringObject.brand}`)
  } 
  if (filteringObject.minPrice !== 0) {
    arr.push(`minPrice=${filteringObject.minPrice}`);
    (document.querySelector('#price-range-min') as HTMLElement).innerHTML = filteringObject.minPrice.toString();
  } 
  if (filteringObject.maxPrice !== 2000) {
    arr.push(`maxPrice=${filteringObject.maxPrice}`);
    (document.querySelector('#price-range-max') as HTMLElement).innerHTML = filteringObject.maxPrice.toString();

  } 
  if (filteringObject.minStock !== 0) {
    arr.push(`minStock=${filteringObject.minStock}`);
    (document.querySelector('#stock-range-min') as HTMLElement).innerHTML = filteringObject.minStock.toString();

  } 
  if (filteringObject.maxStock !== 200) {
    arr.push(`maxStock=${filteringObject.maxStock}`);
    (document.querySelector('#stock-range-max') as HTMLElement).innerHTML = filteringObject.maxStock.toString();

  }
  let newHash = arr.join('&');
   
  return((newHash === '') ? 'main' : 'filter/' + newHash)
}

export function makeFilteringObjectFromHash(hash: string) {
  console.log('func: makeFilteringObjectFromHash')
  let newFilteringObject = {
    name: '',
    brand: [''],
    category: [''],
    minStock: 0,
    maxStock: 200,
    minPrice: 0,
    maxPrice: 2000,
  }
  let arr = decodeURI(hash).slice(8).split('&');
  console.log('!', arr)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes('name')) {
      newFilteringObject.name = arr[i].replace('name=', '');
    }
    if (arr[i].includes('brand')) {
      newFilteringObject.brand = arr[i].replace('brand=', '').split(',');
    }
    if (arr[i].includes('category')) {
      newFilteringObject.category = arr[i].replace('category=', '').split(',');;
    }
    if (arr[i].includes('minStock')) {
      newFilteringObject.minStock = +arr[i].replace('minStock=', '');
    }
    if (arr[i].includes('maxStock')) {
      newFilteringObject.maxStock = +arr[i].replace('maxStock=', '');
    }
    if (arr[i].includes('minPrice')) {
      newFilteringObject.minPrice = +arr[i].replace('minPrice=', '');
    }
    if (arr[i].includes('maxPrice')) {
      newFilteringObject.maxPrice = +arr[i].replace('maxPrice=', '');
    }
  }
  console.log(newFilteringObject)
  return(newFilteringObject)
}

export function drawFilteringObjectOnPage(filteringObject: FilteringObject) {
  
}