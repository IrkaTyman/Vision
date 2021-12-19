export const currencySpelling = (balance,type='vi') => {
  let balanceLength = balance.length
  let lastNum = balance[balanceLength-1]
  if(lastNum == '1' && balance[balanceLength-2] != '1'){
    return type != 'order' ? `${balance} вижен` : `${balance} заказ`
  } else if(lastNum == '2' || lastNum == '3' || lastNum == '4'){
    return type != 'order' ? `${balance} вижена` : `${balance} заказа`
  } else {
    return type != 'order' ? `${balance} виженов` : `${balance} заказов`
  }
}
