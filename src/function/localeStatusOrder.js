export const localeStatusOrder = (status) => {
  if(status == 'inWork') return 'В обработке'
  else if (status == 'inRating') return 'На оценке'
  else return 'Готов'
}
