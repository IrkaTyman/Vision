const returnRightNum = (num) => {
  return num.length == 1 ? '0'+num : num
}

export const getNormalDate = (getDate,longDate=true) => {
  let date = new Date(getDate)
  let day = date.getDate()
  let month = date.getMonth()+1
  let year = date.getFullYear()
  let hour = date.getHours()
  let minutes = date.getMinutes()
  let dateStr = `${returnRightNum(day+'')}.${returnRightNum(month+'')}.${year}`
  longDate ? dateStr+=`, ${returnRightNum(hour+'')}:${returnRightNum(minutes+'')}` : null
  return dateStr
}
