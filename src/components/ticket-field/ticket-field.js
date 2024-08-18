import { React } from 'react'
// import classNames from 'classnames'

import Ticket from '../ticket'

import stl from './ticket-field.module.scss'

function TicketField() {
  return (
    <div className={stl['body']}>
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
    </div>
  )
}

export default TicketField
