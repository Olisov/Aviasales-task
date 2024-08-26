import { React } from 'react'
import PropTypes from 'prop-types'

import FlightInfo from '../flight-info'

import stl from './ticket.module.scss'

function Ticket({ price, carrier, segments }) {
  const [segmentTo, segmentFrom] = segments
  return (
    <section className={stl['body']}>
      <div className={stl['row']}>
        <p className={stl['cost']}>{`${new Intl.NumberFormat('ru-RU').format(price)} P`}</p>
        <img alt="Airline logo" src={`//pics.avs.io/99/36/${carrier}.png`} />
      </div>
      <FlightInfo segment={segmentTo} />
      <FlightInfo segment={segmentFrom} />
    </section>
  )
}

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  segments: PropTypes.array.isRequired,
}

export default Ticket
