import { Component } from "./components";
// import { myJson } from "..";
// import { Product, FilteringObject } from "../modules/interfaces";
import { addActiveClass, removeActiveClass } from "../modules/buttons";
import { text } from "stream/consumers";

export class Modal extends Component {
    
    constructor(tagName: string = 'div', className: string = 'modal') {
        super(tagName, className)
      }
    render(): HTMLElement {
        const modal = document.createElement('div'),
              modalWrapper = document.createElement('div'),
              buyForm = document.createElement('form'),
              modalCloseBTN = document.createElement('span'),
              formPersonalInfo = document.createElement('ul'),
              personalName = document.createElement('li'),
              personalPhone = document.createElement('li'),
              personalAdress = document.createElement('li'),
              personalEmail = document.createElement('li'),
              formCardInfo = document.createElement('div')
              
        modal.classList.add('modal')
        modalWrapper.classList.add('modal__wrapper')
        modalCloseBTN.classList.add('modal__close-btn')
        modalCloseBTN.textContent = '×'
        modalWrapper.append(buyForm,modalCloseBTN)
        const formHeader = document.createElement('h2')
        const formCardHeader = document.createElement('h2')
        const confirmOrderBTN = document.createElement('button')
        confirmOrderBTN.textContent = 'Confirm order'
        confirmOrderBTN.type = 'button'
        confirmOrderBTN.classList.add ('form__confirm-btn')
        formHeader.textContent = 'Personal details'
        formCardHeader.textContent = 'Credit card details'
        //form personal
        buyForm.classList.add('form')
        
        buyForm.append(formHeader ,formPersonalInfo,formCardHeader ,formCardInfo,confirmOrderBTN)
        formPersonalInfo.classList.add('personal-info__list')
        formPersonalInfo.append(personalName, personalPhone, personalAdress, personalEmail)
        let formPersonalInfoValues:string[] = ['Name', 'Phone', 'Email', 'Adress']
        let formPersonalInfoArr = [personalName, personalPhone, personalEmail, personalAdress]
        .forEach((el:HTMLElement, i:number) => {
            let invalid = document.createElement('span')
            invalid.id = 'invalid'
            invalid.textContent = ''
            let input = document.createElement('input')
            input.type = 'text'
            input.placeholder = formPersonalInfoValues[i]
            input.name = formPersonalInfoValues[i]
            input.classList.add('personal-info__input')
            el.classList.add('personal-info__item')
            el.append(input,invalid)
            
        })
        personalName.childNodes[0].addEventListener('input', (e) => {
            let target = e.target as HTMLInputElement
            let span = personalName.childNodes[1] as HTMLSpanElement
            if(!this.checkName(target.value.toString())){
                span.textContent = 'Error! It should contain 2 words with at least 3 characters in each.'
                span.style.color = 'red'
                target.style.border = '2px red solid'
            } else{
                span.textContent = 'Correct ✓'
                span.style.color = 'green'
                target.style.border = '2px green solid'
            }
        })
        personalPhone.childNodes[0].addEventListener('input', (e)=> {
            let target = e.target as HTMLInputElement
            let span = personalPhone.childNodes[1] as HTMLSpanElement
            if(!this.checkPhone(target.value.toString())){
                span.textContent = 'Error! It should contain at least 9 numbers that starts with +'
                span.style.color = 'red'
                target.style.border = '2px red solid'
            } else{
                span.textContent = 'Correct ✓'
                span.style.color = 'green'
                target.style.border = '2px green solid'
            }
        })
        personalAdress.childNodes[0].addEventListener('input', (e)=> {
            let target = e.target as HTMLInputElement
            let span = personalAdress.childNodes[1] as HTMLSpanElement
            if(!this.checkAddress(target.value.toString())){
                span.textContent = 'Error! It should contain 3 words with at least 5 characters in each.'
                span.style.color = 'red'
                target.style.border = '2px red solid'
            } else{
                span.textContent = 'Correct ✓'
                span.style.color = 'green'
                target.style.border = '2px green solid'
            }
        })
        personalEmail.childNodes[0].addEventListener('input', (e)=> {
            let target = e.target as HTMLInputElement
            let span = personalEmail.childNodes[1] as HTMLSpanElement
            if(!this.checkEmail(target.value.toString())){
                span.textContent = 'Error! Enter correct email address'
                span.style.color = 'red'
                target.style.border = '2px red solid'
            } else{
                span.textContent = 'Correct ✓'
                span.style.color = 'green'
                target.style.border = '2px green solid'
            }
        })

        
        //form card  
        const invalidCard = document.createElement('span')
        invalidCard.id = 'invalidCard'
        formCardInfo.classList.add('card-info__wrapper')
        const cardNumberWrapper = document.createElement('div')
        cardNumberWrapper.classList.add('card-number__wrapper')
        const cardType = document.createElement('img')
        const cardNumber = document.createElement('input')
        cardNumber.maxLength = 16
        cardNumber.placeholder = 'Card number'
        cardNumber.classList.add('card-number__input')
        cardNumberWrapper.append(cardType,cardNumber)
        cardType.classList.add('card__type')
        cardType.src = 'https://e7.pngegg.com/pngimages/386/389/png-clipart-envelop-folder-credit-card-debit-card-cooperative-bank-computer-icons-credit-card-black-angle-text.png'
        const cardAdditional = document.createElement('div')
        cardAdditional.classList.add('card__additional')
        const cardValid = document.createElement('input')
        cardValid.placeholder = 'Exp date MMYY'
        cardValid.maxLength = 5
        const cardCVV = document.createElement('input')
        cardCVV.classList.add('card__input')
        cardValid.classList.add('card__input')
        cardCVV.placeholder = 'CVV'
        cardCVV.maxLength = 3
        cardCVV.type = 'password'
        cardAdditional.append(cardValid, cardCVV)
        formCardInfo.append(cardNumberWrapper,cardAdditional,invalidCard)

        cardNumber.addEventListener('input', (e)=> {
            let target = e.target as HTMLInputElement
            let span = formCardInfo.childNodes[2] as HTMLSpanElement
            let img = cardNumberWrapper.childNodes[0] as HTMLImageElement
            
            if(!this.checkCardNumber(target.value.toString())){
                span.textContent = 'Error! It should contain at least 16 numbers'
                span.style.color = 'red'
                target.style.border = '2px red solid'
            } else{
                span.textContent = 'Correct ✓'
                span.style.color = 'green'
                target.style.border = '2px green solid'
            }
            img.src = 'https://e7.pngegg.com/pngimages/386/389/png-clipart-envelop-folder-credit-card-debit-card-cooperative-bank-computer-icons-credit-card-black-angle-text.png'

            if(target.value.toString().startsWith('2')){
                img.src = 'https://ftime.by/sites/default/files/u9671/1_1.png'
            }
            if(target.value.toString().startsWith('3')){
                img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png'
            }
            if(target.value.toString().startsWith('4')){
                img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Visa_Electron.svg/1200px-Visa_Electron.svg.png'
            }
            if(target.value.toString().startsWith('5')){
                img.src = 'https://investor100.ru/wp-content/uploads/2016/11/Mast-1024x584.jpg'
            }
            if(target.value.toString().startsWith('6')){
                img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UnionPay_logo.svg/1200px-UnionPay_logo.svg.png'
            }
            if(target.value.toString().startsWith('7')){
                img.src = 'https://upload.wikimedia.org/wikipedia/ru/thumb/d/de/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%A3%D0%AD%D0%9A.png/200px-%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%A3%D0%AD%D0%9A.png'
            }
            
        })
        cardValid.addEventListener('input', this.addSlash)
        cardValid.addEventListener('input', (e)=> {
            let target = e.target as HTMLInputElement
            let span = formCardInfo.childNodes[2] as HTMLSpanElement
            if(target.value.length === 3){
                cardValid.removeEventListener('input', this.addSlash)
            }
            if(target.value.length === 1){
                cardValid.addEventListener('input', this.addSlash)
            }
            if(!this.checkValidThru(target.value.toString())){
                span.textContent = 'Error! Expire date is incorrect'
                span.style.color = 'red'
                target.style.border = '2px red solid'
            } else{
                span.textContent = 'Correct ✓'
                span.style.color = 'green'
                target.style.border = '2px green solid'
            }  
        })
        
        cardCVV.addEventListener('input', (e)=> {
            let target = e.target as HTMLInputElement
            let span = formCardInfo.childNodes[2] as HTMLSpanElement
            target.value = target.value.replace(/[^\d.]/g, '')
            if(!this.checkCVV(target.value.toString())){
                span.textContent = 'Error! CVV is incorrect'
                span.style.color = 'red'
                target.style.border = '2px red solid'
            } else{
                span.textContent = 'Correct ✓'
                span.style.color = 'green'
                target.style.border = '2px green solid'
            }  
        })


        confirmOrderBTN.addEventListener('click', this.orderModal)




        this.container.append(modalWrapper)
        return this.container;
    }
    openModal (){
        let modal = document.querySelector('.modal') as HTMLElement
        addActiveClass(modal)
        document.addEventListener('click', function clickOut(e){
            let target = e.target as HTMLElement
            if(target.matches('.modal') || target.matches('.modal__close-btn')){
                removeActiveClass(modal)
                document.removeEventListener('click', clickOut)
            }
        })
        
    }
    orderModal (){
        const modalWrapper = document.querySelector('.modal__wrapper')
        modalWrapper!.innerHTML = 'THANKS FOR YOUR ORDER'
        setTimeout(()=>{
            localStorage.cart = ''
            window.location.hash = 'main/'
        },3500)

    }
    checkName(value:string) {
        let letters = /^[a-zA-Z]+$/;
        let words = value.split(' ')
        for (let i = 0; i < words.length; i++) {
            const el = words[i];
            if( el.length < 3 || !el.match(letters) || typeof el !== 'string') return false
        }
        if (words.length >= 2) return true
        return false
    }
    checkPhone(value:string) {
        let numbers = /^\+[0-9]{9,}$/
        if(!value.match(numbers)) return false
        return true
    }
    checkAddress (value:string){
        let letters = /^[a-zA-Z]+$/;
        let words = value.split(' ')
        for (let i = 0; i < words.length; i++) {
            const el = words[i];
            if( el.length < 5 || !el.match(letters) || typeof el !== 'string') return false
        }
        if (words.length >= 3) return true
        return false
    }
    checkEmail (value:string){
        let letters = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
        if(!value.match(letters)) return false
        return true
    }
    checkCardNumber (value:string){
        let numbers = /^[0-9]{16}$/
        if(!value.match(numbers)) return false
        return true
    }
    checkValidThru (value:string){
        let numbers = /^\d+\/\d+$/
        let month = `${value[0]}${value[1]}`
        let year = `${value[3]}${value[4]}`
        // let expire = [month, '/', year]
        console.log(month,year)
        if(Number(month) <=12 && Number(year) >= 23) return true
        return false
    }
    addSlash(e:Event){
        let target = e.target as HTMLInputElement 
        let input = target.value.split('')
        if(input.length === 2){
            input.splice(2,0,'/')
            target.value = input.join('')
        }
    }
    checkCVV (value:string){
        let numbers = /^[0-9]{3}$/
        if(!value.match(numbers)) return false
        return true
    }
    
}
