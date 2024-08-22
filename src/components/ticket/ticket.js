import { React } from 'react'
import PropTypes from 'prop-types'
import { format, addMinutes } from 'date-fns'

import stl from './ticket.module.scss'

function Ticket({ price, carrier, segments }) {
  const [segmentTo, segmentFrom] = segments
  return (
    <section className={stl['body']}>
      <div className={stl['body__row']}>
        <p className={stl['cost']}>{`${new Intl.NumberFormat('ru-RU').format(price)} P`}</p>
        <img alt="Airline logo" src={`//pics.avs.io/99/36/${carrier}.png`} />
      </div>
      <FlightInfo segment={segmentTo} />
      <FlightInfo segment={segmentFrom} />
    </section>
  )
}

function transfersTitle(numTransfers) {
  if (numTransfers === 0) return 'Без пересадок'
  if (numTransfers === 1) return '1 пересадка'
  return `${numTransfers} пересадки`
}

function durationFormat(minutes) {
  return `${Math.floor(minutes / 60)}ч ${minutes % 60}м`
}

function FlightInfo({ segment }) {
  const { origin, destination, date, duration, stops } = segment

  return (
    <div className={stl['body__row']}>
      <div className={stl['body__column']}>
        <p className={stl['title']}>{`${origin} - ${destination}`}</p>
        <p className={stl['data']}>
          {format(new Date(date), 'hh:mm')} &ndash; {format(addMinutes(new Date(date), duration), 'hh:mm')}
        </p>
      </div>
      <div className={stl['body__column']}>
        <p className={stl['title']}>В пути</p>
        <p className={stl['data']}>{durationFormat(duration)}</p>
      </div>
      <div className={stl['body__column']}>
        <p className={stl['title']}> {transfersTitle(stops.length)}</p>
        <p className={stl['data']}>{stops.join(', ')}</p>
      </div>
    </div>
  )
}

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  segments: PropTypes.array.isRequired,
}

FlightInfo.propTypes = {
  segment: PropTypes.object.isRequired,
}

export default Ticket
