export function sortByDateArr(arr){
  arr.sort((a,b)=>a.timestamp.seconds > b.timestamp.seconds ? 1 : a.timestamp.seconds < b.timestamp.seconds ? -1  :0)
  return arr
}
