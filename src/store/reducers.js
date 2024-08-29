import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

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

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    sortStatus: ticketSortStatus.CHEAPEST,
    numTransfersFilter: [],
    numTicketsShown: 5,
  },
  reducers: {
    ticketSortUpdate: (state, action) => ({ ...state, sortStatus: action.payload, numTicketsShown: 5 }),
    transferFilterUpdate: (state, action) => ({ ...state, numTransfersFilter: action.payload }),
    incNumVisibleTickets: (state, action) => ({
      ...state,
      numTicketsShown: state.numTicketsShown + action.payload,
    }),
  },
})

export const asyncRequestSessionId = createAsyncThunk('loadingStatuses/requestSessionId', (apiClient, { dispatch }) => {
  apiClient
    .getSearchId()
    .then((searchId) => {
      dispatch(saveSessionId(searchId))
    })
    .catch((getSearchIdError) => {
      dispatch(requestError(getSearchIdError))
    })
})

const loadingStatusesSlice = createSlice({
  name: 'loadingStatuses',
  initialState: {
    searchId: null,
    loading: true,
    error: null,
    numMissedRequests: 0,
  },
  reducers: {
    saveSessionId: (state, action) => ({ ...state, searchId: action.payload }),
    requestError: (state, action) => ({ ...state, error: action.payload, loading: false }),
    stopTicketLoading: (state) => ({ ...state, loading: false }),
    incNumMissedRequest: (state) => ({ ...state, numMissedRequests: state.numMissedRequests + 1 }),
  },
})

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: [],
  reducers: {
    saveTickets: (state, action) => {
      action.payload.forEach((newTicket) => {
        if (state.findIndex((savedTicket) => savedTicket.key === newTicket.key) < 0) state.push(newTicket)
      })
    },
  },
})

export const asyncRequestTickets = createAsyncThunk(
  'tickets/requestTickets',
  ({ apiClientInstance, searchId }, { dispatch }) => {
    apiClientInstance
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
)

export const { ticketSortUpdate, transferFilterUpdate, incNumVisibleTickets } = filtersSlice.actions
export const { saveSessionId, requestError, stopTicketLoading, incNumMissedRequest } = loadingStatusesSlice.actions
export const { saveTickets } = ticketsSlice.actions
export const filtersReducer = filtersSlice.reducer
export const loadingStatusesReducer = loadingStatusesSlice.reducer
export const ticketsReducer = ticketsSlice.reducer
