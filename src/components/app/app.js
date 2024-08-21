import { React } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Spin, Alert, ConfigProvider } from 'antd'
import classNames from 'classnames'

import aviasalesLogo from '../../assets/Logo.svg'
import TransferFilter from '../transfer-filter'
import TicketSort from '../ticket-sort'
import TicketField from '../ticket-field'
import { asyncRequestSessionId, asyncRequestTickets, incNumVisibleTickets } from '../../store/actions'
import ApiClient from '../../api-client'

import stl from './app.module.scss'

function App() {
  const apiClientInstance = new ApiClient()

  const dispatch = useDispatch()
  const { asyncRequestSessionIdDispatch, asyncRequestTicketsDispatch, incNumVisibleTicketsDispatch } =
    bindActionCreators(
      {
        asyncRequestSessionIdDispatch: asyncRequestSessionId,
        asyncRequestTicketsDispatch: asyncRequestTickets,
        incNumVisibleTicketsDispatch: incNumVisibleTickets,
      },
      dispatch
    )
  const { searchId, loading, warning, numMissedRequests, error } = useSelector((storage) => storage.loadingStatuses)
  const tickets = useSelector((storage) => storage.tickets)

  if (!searchId && !error) asyncRequestSessionIdDispatch(apiClientInstance)
  else if (loading) asyncRequestTicketsDispatch(apiClientInstance, searchId)

  const loadingSpin = loading ? <Spin size="large" /> : null
  const errorMessage = error ? (
    <Alert message={`Ошибка подключения - ${error.name}, ${error.message}`} type="error" showIcon />
  ) : null
  const filterWarningMessage = warning ? <Alert message={warning} type="warning" showIcon /> : null
  const requestsWarningMessage = numMissedRequests ? (
    <Alert
      message={`Проблемы с доступностью сервера, кол-во нудачных запросов - ${numMissedRequests} `}
      type="warning"
      showIcon
      closable
    />
  ) : null

  // console.log('App updated')

  return (
    <div className={classNames(stl['wrapper'], stl['wrapper--center'])}>
      <img className={stl['logo']} src={aviasalesLogo} alt="Aviasales logo" />
      <div className={stl['body']}>
        <TransferFilter />
        <div className={stl['main']}>
          <TicketSort />
          {requestsWarningMessage}
          {errorMessage}
          {loadingSpin}
          {filterWarningMessage}
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
            <Button
              block
              size="large"
              className={stl['more-btn']}
              onClick={() => {
                incNumVisibleTicketsDispatch(5)
              }}
            >
              ПОКАЗАТЬ ЕЩЁ 5, ВСЕГО {tickets.length} БИЛЕТОВ
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}

export default App
