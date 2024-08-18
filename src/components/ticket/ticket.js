import { React } from 'react'
import classNames from 'classnames'

import s7Logo from '../../assets/S7_Logo.png'

import stl from './ticket.module.scss'

function Ticket() {
  return (
    <section className={stl['body']}>
      <div className={stl['body__row']}>
        <p className={stl['cost']}>13 400 P</p>
        <img alt="Airline logo" src={s7Logo} />
      </div>
      <div className={stl['body__row']}>
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
      </div>

      <div className={stl['body__row']}>
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
        </div>
      </div>
    </section>
  )
}

export default Ticket
