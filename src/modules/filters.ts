import { product } from './draw'

export let filtered :product[]

// function filterByNum(arr, param, value1, value2) {
//   console.log(`val1 = ${value1} and ${typeof value1}, value2 = ${value2}`);
//   let result = arr.filter((el) => el[param] >= Number(value1) && el[param] <= Number(value2));
//   console.log(result);
//   return result;
// }


export function filterNumber(arr:product[], param:string, value1:string | EventTarget,value2:string | EventTarget):product[] {
  let result = arr.filter((el) => el[param as keyof product] >= Number(value1) && el[param as keyof product] <= Number(value2));
    
    return result ;
  }
  
  export function filterStrings(arr:product[], param:string, value:string) {
    let searchArr = arr.filter((el) => {
    let lowerCaseValue = el[param as keyof product] as string
      if (lowerCaseValue.toLowerCase().includes((value.toLowerCase() as string))) return el;
    });
    console.log(searchArr);
    return searchArr;
  }