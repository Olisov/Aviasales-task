import { React } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { ticketSortStatus } from '../../store/actions'
import Ticket from '../ticket'

import stl from './ticket-field.module.scss'

function TicketField({ tickets }) {
  const { sortStatus, numTicketsShown } = useSelector((storage) => storage.filters)

  if (sortStatus === ticketSortStatus.CHEAPEST) {
    tickets.sort((first, second) => first.price - second.price)
  } else if (sortStatus === ticketSortStatus.FASTEST) {
    tickets.sort((first, second) => first.totalDuration - second.totalDuration)
  } else {
    tickets.sort((first, second) => first.optimality - second.optimality)
  }

  return (
    <div className={stl['body']}>
      {tickets.slice(0, numTicketsShown).map((ticket) => {
        const { price, carrier, optimality, segments } = ticket
        return <Ticket key={`${carrier}_${price}_${optimality}`} price={price} carrier={carrier} segments={segments} />
      })}
    </div>
  )
}

TicketField.propTypes = {
  tickets: PropTypes.array.isRequired,
}

export default TicketField
