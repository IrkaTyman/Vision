export function sortByDateArr(arr){
  arr.sort((a,b)=>{
    let aTime = a.dateComplete || a.timestamp.seconds
    let bTime = b.dateComplete || b.timestamp.seconds
    if(aTime > bTime) return 1
    if(aTime<bTime) return -1
    return 0})
  return arr
}

export function sortByStatusOrder(arr,status){
  // status == 'true' : 'Готовый'
  arr = arr.filter((item)=>{
    if(item.status == 'inComplete') {
      return status
    }
    return !status
  })
  return arr
}
