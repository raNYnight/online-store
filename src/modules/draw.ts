import { filteringObject } from "./filters"
import { globalFilter } from "./filters"
import { FilteringObject, Product } from "./interfaces"

export function draw(data:Product[]):void{
const products = document.querySelector('.products__list') as HTMLElement
const productsFound = document.querySelector('#found_products') as HTMLElement
productsFound.textContent = data.length.toString()
products.innerHTML = ''
for (let i:number = 0; i < data.length; i += 1){
    let productHTML:string = `<div class="products__item">
    <span class="products__item_header">${data[i].title}</span>
    <img src="${data[i].thumbnail}" alt="" class="products__item_img" >
    <div class="products__item_info">
        <span class="item__category">Category: ${data[i].category}</span>
        <span class="item__brand">Brand: ${data[i].brand}</span>
        <span class="item__price">Price: ${data[i].price}</span>
        <span class="item__discount">Discount: ${data[i].discountPercentage}</span>
        <span class="item__rating">Rating: ${data[i].rating}</span>
        <span class="item__stock">Stock: ${data[i].stock}</span>
    </div>
    <div class="products__item_buttons">
        <button class="item__add-to-card">Add to card</button>
        <button class="item__info">Details</button>
    </div>
</div>`
    products.insertAdjacentHTML('beforeend', productHTML)
}
console.log('draw')
console.log(data)
}




export function drawFilterList (data:Product[], param:string, parent:HTMLElement){
    parent.innerHTML = ''
    let uniqueArr = Array.from(new Set(data.map(item => item[param as keyof Product])))
    // console.log(`${param}list = ${uniqueArr}`)
    for (let index = 0; index < uniqueArr.length; index++) {
        const element = uniqueArr[index];
        parent.innerHTML += `<div class="filter__list_item"><input type="checkbox" name="${param}" id="${param}${index}"><label for="${param}${index}">${element}</label></div>`
    }
    parent.addEventListener('change', (e) => {
        const checkbox = e.target as HTMLInputElement
        let paramArr = filteringObject[param as keyof FilteringObject] as string[]
        if (checkbox !== null && checkbox.checked){
            
            paramArr.push(checkbox.parentNode?.textContent as string)
        }else{
            paramArr.splice(paramArr.indexOf(checkbox.parentNode?.textContent as string), 1)
        }
        let foundData:Product[] = globalFilter(data,filteringObject)
        draw(foundData)
    })
    console.log('drawFilters')
}