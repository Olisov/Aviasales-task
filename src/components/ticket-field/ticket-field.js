import { React } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Ticket from '../ticket'
// import classNames from 'classnames'

import stl from './ticket-field.module.scss'

function TicketField() {
  const tickets = useSelector((storage) => storage.tickets)
  const { sortStatus, numTransfersFilter } = useSelector((storage) => storage.filters)
  const { numTicketsShown } = useSelector((storage) => storage.loadingStatuses)
  const filterTickets = tickets
  const sortedTickets = filterTickets.slice(0, numTicketsShown)

  return (
    <div className={stl['body']}>
      {/* <Ticket /> */}

      {sortedTickets.map((ticket) => {
        const { price, carrier, totalDuration, segments } = ticket
        return (
          <Ticket
            key={`${carrier}_${price}_${totalDuration}`}
            price={price}
            carrier={carrier}
            // optimality={optimality}
            // totalDuration={totalDuration}
            segments={segments}
          />
        )
      })}
    </div>
  )
}

export default TicketField
