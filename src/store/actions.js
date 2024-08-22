export const ticketSortStatus = {
  CHEAPEST: 'cheapest',
  FASTEST: 'fastest',
  OPTIMAL: 'optimal',
}
export const numTransferName = {
  NO_TRANSFERS: 0,
  ONE_TRANSFER: 1,
  TWO_TRANSFERS: 2,
  THREE_TRANSFERS: 3,
}

export const UPDATE_TRANSFERS_FILTER = 'UPDATE_TRANSFERS_FILTER'
export const UPDATE_TICKET_SORT = 'UPDATE_TICKET_SORT'
export const SAVE_SEARCH_ID = 'SAVE_SEARCH_ID'
export const SAVE_TICKETS = 'SAVE_TICKETS'
export const LOADING_STOP = 'LOADING_STOP'
export const REQUEST_ERROR = 'REQUEST_ERROR'
export const INCREMENT_NUM_MISSED_REQUEST = 'INCREMENT_NUM_MISSED_REQUEST'
export const INCREMENT_NUM_VISIBLE_TICKETS = 'INCREMENT_NUM_VISIBLE_TICKETS'

export const transferFilterUpdate = (payload) => ({ type: UPDATE_TRANSFERS_FILTER, payload })
export const ticketSortUpdate = (payload) => ({ type: UPDATE_TICKET_SORT, payload })
export const requestError = (error) => ({ type: REQUEST_ERROR, payload: { error, loading: false } })
export const stopTicketLoading = () => ({ type: LOADING_STOP, payload: false })
export const incNumMissedRequest = () => ({ type: INCREMENT_NUM_MISSED_REQUEST })
export const incNumVisibleTickets = (payload) => ({ type: INCREMENT_NUM_VISIBLE_TICKETS, payload })

export const saveSessionId = (payload) => ({ type: SAVE_SEARCH_ID, payload })
export const asyncRequestSessionId = (apiClient) => {
  return (dispatch) => {
    apiClient
      .getSearchId()
      .then((searchId) => {
        dispatch(saveSessionId(searchId))
      })
      .catch((getSearchIdError) => {
        dispatch(requestError(getSearchIdError))
      })
  }
}

export const saveTickets = (ticketsArr) => ({ type: SAVE_TICKETS, payload: ticketsArr })
export const asyncRequestTickets = (apiClient, searchId) => {
  return (dispatch) => {
    apiClient
      .getTickets(searchId)
      .then((serverAnswer) => {
        const { stop, tickets } = serverAnswer

        if (stop) dispatch(stopTicketLoading())
        dispatch(saveTickets(tickets))
      })
      .catch((getTicketsError) => {
        if (getTicketsError.message !== 'Server failure, received 500') dispatch(requestError(getTicketsError))
        else dispatch(incNumMissedRequest())
      })
  }
}
