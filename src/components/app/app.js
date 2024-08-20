import { React } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { Button, ConfigProvider } from 'antd'
import classNames from 'classnames'

import aviasalesLogo from '../../assets/Logo.svg'
import TransferFilter from '../transfer-filter'
import TicketSort from '../ticket-sort'
import TicketField from '../ticket-field'
import reducer from '../../store/reducers'

import stl from './app.module.scss'

function App() {
  const loggerMiddleware = (store) => (next) => (action) => {
    const result = next(action)
    // console.log('action', action)
    console.log('Middleware', store.getState())
    return result
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(reducer, composeEnhancers(applyMiddleware(loggerMiddleware, thunk)))
  // const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunk))

  return (
    <Provider store={store}>
      <div className={classNames(stl['wrapper'], stl['wrapper--center'])}>
        <img className={stl['logo']} src={aviasalesLogo} alt="Aviasales logo" />
        <div className={stl['body']}>
          <TransferFilter />
          <div className={stl['main']}>
            <TicketSort />
            <TicketField />

            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultHoverBg: '#4096ff',
                    defaultHoverColor: '#000',
                  },
                },
              }}
            >
              <Button block size="large" className={stl['more-btn']}>
                ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ!
              </Button>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </Provider>
  )
}

export default App
