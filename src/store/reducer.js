const initStore = {
  costFilterStatus: 'cheapest',
  numTransfersArr: ['0', '2'],
}

const reducer = (state = initStore, action) => {
  switch (action.type) {
    case 'UPDATE_TRANSFERS_FILTER':
      return { ...state, numTransfersArr: action.payload }
    case 'UPDATE_COST_FILTER':
      return { ...state, costFilterStatus: action.payload }
    default:
      return state
  }
}

export default reducer
