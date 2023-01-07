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
            let input = document.createElement('input')
            input.type = 'text'
            input.placeholder = formPersonalInfoValues[i]
            input.name = formPersonalInfoValues[i]
            input.classList.add('personal-info__input')
            el.classList.add('personal-info__item')
            el.append(input)
            
        })
        
        //form card 
        
        
        formCardInfo.classList.add('card-info__wrapper')
        const cardNumberWrapper = document.createElement('div')
        cardNumberWrapper.classList.add('card-number__wrapper')
        const cardType = document.createElement('img')
        const cardNumber = document.createElement('input')
        cardNumber.placeholder = 'Card number'
        cardNumberWrapper.append(cardType,cardNumber)
        cardType.classList.add('card__type')
        cardType.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Visa_Electron.svg/1200px-Visa_Electron.svg.png'
        const cardAdditional = document.createElement('div')
        cardAdditional.classList.add('card__additional')
        const cardValid = document.createElement('input')
        cardValid.placeholder = 'Valid Thru'
        const cardCVV = document.createElement('input')
        cardCVV.classList.add('card__input')
        cardValid.classList.add('card__input')
        cardCVV.placeholder = 'CVV'
        cardAdditional.append(cardValid, cardCVV)
        formCardInfo.append(cardNumberWrapper,cardAdditional)




        
        
        

        


        this.container.append(modalWrapper)
        return this.container;
    }
    openModal (){
        console.log('open modal')
        
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

}
