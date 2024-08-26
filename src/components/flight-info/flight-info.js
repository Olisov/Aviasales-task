import { React } from 'react'
import PropTypes from 'prop-types'
import { format, addMinutes } from 'date-fns'

import { durationFormat, transfersTitle } from '../utilites'

import stl from './flight-info.module.scss'

function FlightInfo({ segment }) {
  const { origin, destination, date, duration, stops } = segment

  return (
    <div className={stl['row']}>
      <div className={stl['column']}>
        <p className={stl['title']}>{`${origin} - ${destination}`}</p>
        <p className={stl['data']}>
          {format(new Date(date), 'hh:mm')} &ndash; {format(addMinutes(new Date(date), duration), 'hh:mm')}
        </p>
      </div>
      <div className={stl['column']}>
        <p className={stl['title']}>В пути</p>
        <p className={stl['data']}>{durationFormat(duration)}</p>
      </div>
      <div className={stl['column']}>
        <p className={stl['title']}> {transfersTitle(stops.length)}</p>
        <p className={stl['data']}>{stops.join(', ')}</p>
      </div>
    </div>
  )
}

FlightInfo.propTypes = {
  segment: PropTypes.object.isRequired,
}

export default FlightInfo
