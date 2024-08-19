import { React } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Button, ConfigProvider } from 'antd'
import classNames from 'classnames'

import aviasalesLogo from '../../assets/Logo.svg'
import TransferFilter from '../transfer-filter'
import CostFilter from '../cost-filter'
import TicketField from '../ticket-field'
import reducer from '../../store/reducer'

import stl from './app.module.scss'

function App() {
  const store = createStore(reducer)

  return (
    <Provider store={store}>
      <div className={classNames(stl['wrapper'], stl['wrapper--center'])}>
        <img className={stl['logo']} src={aviasalesLogo} alt="Aviasales logo" />
        <div className={stl['body']}>
          <TransferFilter />
          <div className={stl['main']}>
            <CostFilter />
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
