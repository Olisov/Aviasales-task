import React from 'react'
import { createRoot } from 'react-dom/client'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { thunk } from 'redux-thunk'

import reducer from './store/reducers'
import App from './components/app'
import './index.scss'

const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action)
  console.log('action', action)
  // console.log('Middleware', store.getState())
  return result
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const applyEnhancers =
  process.env.NODE_ENV !== 'production'
    ? composeEnhancers(applyMiddleware(loggerMiddleware, thunk))
    : applyMiddleware(thunk)

const store = createStore(reducer, applyEnhancers)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
