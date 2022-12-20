export interface data {
    limit:number,
    products: product[],
    skip: number,
    total: number
}

export interface product {
    brand:string,
    category:string,
    description:string,
    discountPercentage:number,
    id:number,
    images:string[]
    price:number,
    rating:number,
    stock:number,
    thumbnail:string,
    title:string,
}

export  function draw(data:product[]):void{
const products = document.querySelector('.products') as HTMLElement
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

console.log(data)
}