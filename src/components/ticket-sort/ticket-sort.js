import { React } from 'react'
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { Radio, ConfigProvider } from 'antd'
// import classNames from 'classnames'

import { ticketSortStatus, ticketSortUpdate } from '../../store/actions'

import stl from './ticket-sort.module.scss'

function TicketSort() {
  const dispatch = useDispatch()
  const { filterUpdateDispatch } = bindActionCreators({ filterUpdateDispatch: ticketSortUpdate }, dispatch)
  // const sortStatus = useSelector((state) => state.sortStatus)
  const { sortStatus } = useSelector((state) => state.filters)

  const onChange = (e) => {
    // dispatch(ticketSortUpdate(e.target.value))

    filterUpdateDispatch(e.target.value)
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Radio: {
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '12px',
            borderRadius: 4,
            buttonBg: '#fff',
            buttonColor: '#4a4a4a',
            buttonCheckedBg: '#2196F3',
            colorPrimaryHover: '#000',
          },
        },
      }}
    >
      <Radio.Group className={stl['radio-group']} onChange={onChange} defaultValue={sortStatus}>
        <Radio.Button value={ticketSortStatus.CHEAPEST}>Самый дешёвый</Radio.Button>
        <Radio.Button value={ticketSortStatus.FASTEST}>Самый быстрый</Radio.Button>
        <Radio.Button value={ticketSortStatus.OPTIMAL}>Оптимальный</Radio.Button>
      </Radio.Group>
    </ConfigProvider>
  )
}

export default TicketSort
