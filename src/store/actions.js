export const ticketSortStatus = {
  CHEAPEST: 'cheapest',
  FASTEST: 'fastest',
  OPTIMAL: 'optimal',
}
export const numTransferName = {
  NO_TRANSFERS: '0',
  ONE_TRANSFER: '1',
  TWO_TRANSFERS: '2',
  THREE_TRANSFERS: '3',
}

export const UPDATE_TRANSFERS_FILTER = 'UPDATE_TRANSFERS_FILTER'
export const UPDATE_COST_FILTER = 'UPDATE_COST_FILTER'

export const transferFilterUpdate = (payload) => ({ type: UPDATE_TRANSFERS_FILTER, payload })
export const ticketSortUpdate = (payload) => ({ type: UPDATE_COST_FILTER, payload })
