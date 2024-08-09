import { React } from 'react'
import classNames from 'classnames'

import aviasales from '../../assets/Logo.svg'
import TransferFilter from '../transfer-filter'
import CostFilter from '../cost-filter'
import TicketField from '../ticket-field'

import stl from './app.module.scss'

function App() {
  return (
    <div className={classNames(stl['wrapper'], stl['wrapper--center'])}>
      <img className={stl['logo']} src={aviasales} alt="Aviasales logo" />
      <div className={stl['body']}>
        <TransferFilter />
        <div>
          <CostFilter />
          <TicketField />
          <button type="button">ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ!</button>
        </div>
      </div>
    </div>
  )
}

export default App
