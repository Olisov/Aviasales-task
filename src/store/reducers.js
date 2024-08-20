import { combineReducers } from 'redux'

import { numTransferName, UPDATE_TRANSFERS_FILTER, ticketSortStatus, UPDATE_COST_FILTER } from './actions'

const initFilters = {
  costFilter: ticketSortStatus.CHEAPEST,
  numTransfersFilter: [numTransferName.NO_TRANSFERS, numTransferName.TWO_TRANSFERS],
  // numTransfersFilter: [],
}

const filters = (state = initFilters, action) => {
  switch (action.type) {
    case UPDATE_COST_FILTER:
      return { ...state, costFilter: action.payload }
    case UPDATE_TRANSFERS_FILTER:
      return { ...state, numTransfersFilter: action.payload }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  filters,
})

export default rootReducer
