import { group } from "console";
import { fetchJSON } from "./fetch";
import { filteringObject, globalFilter } from "./filters";
import { FilteringObject } from "./interfaces";

export function router(event: HashChangeEvent) {
  let newHash = event.newURL.slice(event.newURL.indexOf('#') + 1);
  page(newHash)
}

export function clearFiltersVar() {
  for (let f in filteringObject) {
    f = '';
  }
}

export function page(url: string) {
  if (url === 'main') {
    console.log('main')
  } else if (url === 'cart') {
    console.log('cart')
  } else if (url.startsWith('filter/')) {
    console.log('filter')
  } else if (url.startsWith('item/')) {
    console.log('item')
  }
}

export function parseUrlHashIntoFiltersArr(hash: string) {
  return hash.slice(2).split('&'); 
}

export function makeHashFromfFilteringObject() {
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
    arr.push(`minPrice=${filteringObject.minPrice}`)
  } 
  if (filteringObject.maxPrice !== 2000) {
    arr.push(`maxPrice=${filteringObject.maxPrice}`)
  } 
  if (filteringObject.minStock !== 0) {
    arr.push(`minStock=${filteringObject.minStock}`)
  } 
  if (filteringObject.maxStock !== 200) {
    arr.push(`maxStock=${filteringObject.maxStock}`)
  }
  console.log(arr.join('&'))
  let newHash = 'filter/' + arr.join('&');
  window.location.hash = newHash
}

export function makeFilteringObjectFromHash(hash: string) {
  let newFilteringObject = {
    name: '',
    brand: '',
    category: '',
    minStock: '0',
    maxStock: '200',
    minPrice: '0',
    maxPrice: '2000',
  }
  let arr = hash.slice(8).split('&');
  console.log(arr)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes('name')) {
      newFilteringObject.name = arr[i].replace('name=', '');
    }
    if (arr[i].includes('brand')) {
      newFilteringObject.brand = arr[i].replace('brand=', '');
    }
    if (arr[i].includes('category')) {
      newFilteringObject.category = arr[i].replace('category=', '');
    }
    if (arr[i].includes('minStock')) {
      newFilteringObject.minStock = arr[i].replace('minStock=', '');
    }
    if (arr[i].includes('maxStock')) {
      newFilteringObject.maxStock = arr[i].replace('maxStock=', '');
    }
    if (arr[i].includes('minPrice')) {
      newFilteringObject.minPrice = arr[i].replace('minPrice=', '');
    }
    if (arr[i].includes('maxPrice')) {
      newFilteringObject.maxPrice = arr[i].replace('maxPrice=', '');
    }
  }
  console.log(newFilteringObject)
  fetchJSON('https://dummyjson.com/products?limit=100').then((myJSON) => { 
    globalFilter(myJSON, filteringObject)
  })
  
}