export function transfersTitle(numTransfers) {
  if (numTransfers === 0) return 'Без пересадок'
  if (numTransfers === 1) return '1 пересадка'
  return `${numTransfers} пересадки`
}

export function durationFormat(minutes) {
  return `${Math.floor(minutes / 60)}ч ${minutes % 60}м`
}
