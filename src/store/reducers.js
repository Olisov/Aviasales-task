import { combineReducers } from 'redux'

import {
  UPDATE_TRANSFERS_FILTER,
  ticketSortStatus,
  UPDATE_TICKET_SORT,
  SAVE_SEARCH_ID,
  SAVE_TICKETS,
  LOADING_STOP,
  REQUEST_ERROR,
  INCREMENT_NUM_MISSED_REQUEST,
  INCREMENT_NUM_VISIBLE_TICKETS,
} from './actions'

const initFilters = {
  sortStatus: ticketSortStatus.CHEAPEST,
  numTransfersFilter: [],
  numTicketsShown: 5,
}
const initLoadingStatuses = {
  searchId: null,
  loading: true,
  error: null,
  numMissedRequests: 0,
}

const filters = (state = initFilters, action) => {
  switch (action.type) {
    case UPDATE_TICKET_SORT:
      return { ...state, sortStatus: action.payload, numTicketsShown: 5 }
    case UPDATE_TRANSFERS_FILTER:
      return { ...state, numTransfersFilter: action.payload }
    case INCREMENT_NUM_VISIBLE_TICKETS:
      return { ...state, numTicketsShown: state.numTicketsShown + action.payload }
    default:
      return state
  }
}

const loadingStatuses = (state = initLoadingStatuses, action) => {
  switch (action.type) {
    case SAVE_SEARCH_ID:
      return { ...state, searchId: action.payload }
    case REQUEST_ERROR:
      return { ...state, ...action.payload }
    case LOADING_STOP:
      return { ...state, loading: action.payload }
    case INCREMENT_NUM_MISSED_REQUEST:
      return { ...state, numMissedRequests: state.numMissedRequests + 1 }
    default:
      return state
  }
}

const tickets = (state = [], action) => {
  switch (action.type) {
    case SAVE_TICKETS:
      const newState = [...state]

      action.payload.forEach((newTicket) => {
        if (state.findIndex((savedTicket) => savedTicket.key === newTicket.key) < 0) newState.push(newTicket)
      })

      return newState
    default:
      return state
  }
}

const rootReducer = combineReducers({
  filters,
  loadingStatuses,
  tickets,
})

export default rootReducer
