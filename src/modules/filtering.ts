import { myJson } from "..";
import { FilteringObject, MyJsonProps, Product } from "./interfaces";
import { build } from "./page-builder";

export let filteringObject: FilteringObject = {
  name: '',
  category: [],
  brand: [],
  minStock: 0,
  maxStock: 200,
  minPrice: 0,
  maxPrice: 2000,
  sort: 'default'
}
export const myJsonProps: MyJsonProps = {
  categories: [],
  brands: [],
  prices: {
    min: 0,
    max: 0,
  },
  stocks: {
    min: 0,
    max: 0,
  }

} 

export function makeMyJsonProperties() {
  const categoriesSet: Set<string> = new Set();
  const brandsSet: Set<string> = new Set();
  for (let i = 0; i < myJson.length; i++) {
    categoriesSet.add(myJson[i].category); // .toLowerCase()
    brandsSet.add(myJson[i].brand); // .toLowerCase()
  }
  myJsonProps.categories = [...categoriesSet]
  myJsonProps.brands = [...brandsSet]
  // console.log(myJsonProps)
}


export function resetFilteringObject() {
  filteringObject = {
    name: '',
    brand: [],
    category: [],
    minStock: 0,
    maxStock: 200,
    minPrice: 0,
    maxPrice: 2000,
    sort: 'default'
  }
  window.location.hash = 'main/'
  build('main/')
}

export function changeFilteringObject(prop: string, value: string) { // from filters
  // console.log('func: changeFilteringObject')
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
  // console.log(filteringObject)
}

export function myJsonWithFilters(data: Product[], obj: FilteringObject) {
  // console.log('func: myJsonWithFilters')
  let arr: Product[] = Object.assign(data)
  let result = arr
    .filter(elem => {
      if (obj.brand.length > 0) return obj.brand.some(tag => elem.brand.includes(tag))
      else return elem
    })
    .filter((elem) => {
      if (obj.category.length > 0) return obj.category.some(tag => elem.category.includes(tag))
      else return elem
    })
    .filter(elem => {
      if (obj.name.length > 0) {
        let filterSearch = obj.name.toLowerCase();
        let isTitleIncludes = elem.title.toLowerCase().includes(filterSearch)
        let isCategoryIncludes = elem.category.toLowerCase().includes(filterSearch)
        let isBrandIncludes = elem.brand.toLowerCase().includes(filterSearch)
        let isDescriptionIncludes = elem.description.toLowerCase().includes(filterSearch)
        if (isTitleIncludes || isCategoryIncludes || isBrandIncludes || isDescriptionIncludes) return elem;
      } else return elem
    })
    .filter((el) => el.stock >= Number(obj.minStock) && el.stock <= Number(obj.maxStock) && el.price >= Number(obj.minPrice) && el.price <= Number(obj.maxPrice))
    sortProducts(result, filteringObject.sort)
  return result
}

export function makeHashFromfFilteringObject(filteringObject: FilteringObject) {
  // console.log('func: makeHashFromfFilteringObject')
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
  }
  if (filteringObject.maxPrice !== 2000) {
    arr.push(`maxPrice=${filteringObject.maxPrice}`);
  }
  if (filteringObject.minStock !== 0) {
    arr.push(`minStock=${filteringObject.minStock}`);
  }
  if (filteringObject.maxStock !== 200) {
    arr.push(`maxStock=${filteringObject.maxStock}`);
  }
  if (filteringObject.sort !== '') {
    arr.push(`sort=${filteringObject.sort}`);
  }
  let newHash = arr.join('&');
  return ('main/' + newHash)
}

export function makeFilteringObjectFromHash(hash: string) {
  // console.log('func: makeFilteringObjectFromHash')
  let arr = decodeURI(hash).slice(6).split('&');
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes('name')) {
      filteringObject.name = arr[i].replace('name=', '');
    }
    if (arr[i].includes('brand')) {
      filteringObject.brand = arr[i].replace('brand=', '').split(',');
    }
    if (arr[i].includes('category')) {
      filteringObject.category = arr[i].replace('category=', '').split(',');;
    }
    if (arr[i].includes('minStock')) {
      filteringObject.minStock = +arr[i].replace('minStock=', '');
    }
    if (arr[i].includes('maxStock')) {
      filteringObject.maxStock = +arr[i].replace('maxStock=', '');
    }
    if (arr[i].includes('minPrice')) {
      filteringObject.minPrice = +arr[i].replace('minPrice=', '');
    }
    if (arr[i].includes('maxPrice')) {
      filteringObject.maxPrice = +arr[i].replace('maxPrice=', '');
    }
    if (arr[i].includes('sort')) {
      filteringObject.sort = arr[i].replace('sort=', '');
    }
  }
}

export function sortProducts(obj: Product[] = myJson, order: string) {
  // console.log(`sortProducts ${order}`)
  switch (order) {
    case 'default':
      myJson.sort((a, b) => a.id - b.id)
      break;
    case 'price🠗':
      myJson.sort((a,b) => b.price - a.price)
      break;
    case 'price🠕':
      myJson.sort((a,b) => a.price - b.price)
      break;
    case 'rating🠕':
      myJson.sort((a, b) => b.rating - a.rating)
      break;
    case 'rating🠗':
      myJson.sort((a,b) => a.rating - b.rating)
      break;
  }
}