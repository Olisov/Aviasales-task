import React from 'react'
import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { filtersReducer, loadingStatusesReducer, ticketsReducer } from './store/reducers'
import App from './components/app'
import './index.scss'

// const loggerMiddleware = (store) => (next) => (action) => {
//   const result = next(action)
//   // console.log('action', action)
//   // console.log('Middleware', store.getState())
//   return result
// }

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    loadingStatuses: loadingStatusesReducer,
    tickets: ticketsReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
