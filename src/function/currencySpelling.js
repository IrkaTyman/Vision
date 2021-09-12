export const currencySpelling = (balance) => {
  let balanceLength = balance.length
  let lastNum = balance[balanceLength-1]
  if(lastNum == '1' && balance[balanceLength-2] != '1'){
    return `${balance} вижен`
  } else if(lastNum == '2' || lastNum == '3' || lastNum == '4'){
    return `${balance} вижена`
  } else {
    return `${balance} виженов`
  }
}
