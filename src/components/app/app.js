import { React, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Spin, Alert, ConfigProvider } from 'antd'
import classNames from 'classnames'

import aviasalesLogo from '../../assets/Logo.svg'
import TransferFilter from '../transfer-filter'
import TicketSort from '../ticket-sort'
import TicketField from '../ticket-field'
import { asyncRequestSessionId, asyncRequestTickets, incNumVisibleTickets, ticketSortStatus } from '../../store/actions'
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
  const { searchId, loading, numMissedRequests, error } = useSelector((storage) => storage.loadingStatuses)
  const { numTransfersFilter, sortStatus } = useSelector((storage) => storage.filters)
  const tickets = useSelector((storage) => storage.tickets)

  if (!searchId && !error) asyncRequestSessionIdDispatch(apiClientInstance)
  else if (loading) asyncRequestTicketsDispatch(apiClientInstance, searchId)

  const loadingSpin = loading ? <Spin size="large" /> : null
  const errorMessage = error ? (
    <Alert message={`Ошибка подключения - ${error.name}, ${error.message}`} type="error" showIcon />
  ) : null
  const requestsWarningMessage = numMissedRequests ? (
    <Alert
      message={`Проблемы с доступностью сервера, кол-во нудачных запросов - ${numMissedRequests} `}
      type="warning"
      showIcon
      closable
    />
  ) : null

  const filteredTicketsMemo = useMemo(() => {
    const filteredTickets =
      numTransfersFilter.length === 0
        ? []
        : tickets.filter(({ segments: [segmentTo, segmentFrom] }) => {
            const fitStopsTo = numTransfersFilter.findIndex((num) => num === segmentTo.stops.length) >= 0
            const fitStopsFrom = numTransfersFilter.findIndex((num) => num === segmentFrom.stops.length) >= 0
            if (fitStopsTo || fitStopsFrom) return true
            return false
          })

    if (sortStatus === ticketSortStatus.CHEAPEST) {
      filteredTickets.sort((first, second) => first.price - second.price)
    } else if (sortStatus === ticketSortStatus.FASTEST) {
      filteredTickets.sort((first, second) => first.totalDuration - second.totalDuration)
    } else {
      filteredTickets.sort((first, second) => first.optimality - second.optimality)
    }
    return filteredTickets
  }, [tickets, numTransfersFilter, sortStatus])

  const idSuitableTickets = filteredTicketsMemo.length > 0
  const content = idSuitableTickets ? (
    <TicketField tickets={filteredTicketsMemo} />
  ) : (
    <Alert message="Рейсов, подходящих под заданные фильтры, не найдено" type="warning" showIcon />
  )
  const showMoreBtn = idSuitableTickets ? (
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
        ПОКАЗАТЬ ЕЩЁ 5, ВСЕГО {filteredTicketsMemo.length} БИЛЕТОВ
      </Button>
    </ConfigProvider>
  ) : null

  return (
    <div className={classNames(stl['wrapper'], stl['wrapper--center'])}>
      <img className={stl['logo']} src={aviasalesLogo} alt="Aviasales logo" />
      <div className={stl['body']}>
        <TransferFilter />
        <div className={stl['main']}>
          <TicketSort />
          {errorMessage}
          {requestsWarningMessage}
          {loadingSpin}
          {content}
          {showMoreBtn}
        </div>
      </div>
    </div>
  )
}

export default App
