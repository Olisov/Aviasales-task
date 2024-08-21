import { React } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
// для реализации "06:50 – 12:12" удобно использовать функцию add() из пакета date-fns. Также date формата '2022-11-11T23:50:00.000Z' спокойно съедает new Date(date)
// import classNames from 'classnames'

import s7Logo from '../../assets/S7_Logo.png'

import stl from './ticket.module.scss'

// carrierLogo: `//pics.avs.io/99/36/${carrier}.png`,

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

      {/* <div className={stl['body__row']}>
        <div className={stl['body__column']}>
          <p className={stl['title']}>MOW - HKT</p>
          <p className={stl['data']}>10:45 &ndash; 08:00</p>
        </div>
        <div className={stl['body__column']}>
          <p className={stl['title']}>В пути</p>
          <p className={stl['data']}>21ч 15м</p>
        </div>
        <div className={stl['body__column']}>
          <p className={stl['title']}>2 пересадки</p>
          <p className={stl['data']}>HKG, JNB</p>
        </div>
      </div> */}

      {/* <div className={stl['body__row']}>
        <div className={stl['body__column']}>
          <p className={stl['title']}>MOW - HKT</p>
          <p className={stl['data']}>11:20 &ndash; 00:50</p>
        </div>
        <div className={stl['body__column']}>
          <p className={stl['title']}>В пути</p>
          <p className={stl['data']}>13ч 30м</p>
        </div>
        <div className={stl['body__column']}>
          <p className={stl['title']}>1 пересадка</p>
          <p className={stl['data']}>HKG</p>
        </div> */}
      {/* </div> */}
    </section>
  )
}

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  segments: PropTypes.array.isRequired,
}

function FlightInfo({ segment }) {
  console.log('segment', segment)
  const { origin, destination, date, duration, stops } = segment
  return (
    <div className={stl['body__row']}>
      <div className={stl['body__column']}>
        <p className={stl['title']}>{`${origin} - ${destination}`}</p>
        <p className={stl['data']}>10:45 &ndash; 08:00</p>
        {/* <p className={stl['data']}>{`${new Date(date)} &ndash; ${new Date(date).add(duration)}`}</p> */}
      </div>
      <div className={stl['body__column']}>
        <p className={stl['title']}>В пути</p>
        <p className={stl['data']}>21ч 15м</p>
      </div>
      <div className={stl['body__column']}>
        <p className={stl['title']}>2 пересадки</p>
        {/* <p className={stl['data']}>HKG, JNB</p> */}
        <p className={stl['data']}>{stops.join(', ')}</p>
      </div>
    </div>
  )
}

FlightInfo.propTypes = {
  segment: PropTypes.object.isRequired,
}

export default Ticket
