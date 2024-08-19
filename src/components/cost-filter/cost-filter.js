import { React } from 'react'
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { Radio, ConfigProvider } from 'antd'
// import classNames from 'classnames'

import { costFilterUpdate } from '../../store/actions'

import stl from './cost-filter.module.scss'

function CostFilter() {
  const dispatch = useDispatch()
  const { filterUpdateDispatch } = bindActionCreators({ filterUpdateDispatch: costFilterUpdate }, dispatch)
  const costFilterStatus = useSelector((state) => state.costFilterStatus)

  const onChange = (e) => {
    // dispatch(costFilterUpdate(e.target.value))
    filterUpdateDispatch(e.target.value)
  }

  // console.log('costFilterStatus', costFilterStatus)

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
      <Radio.Group className={stl['radio-group']} onChange={onChange} defaultValue={costFilterStatus}>
        <Radio.Button value="cheapest">Самый дешёвый</Radio.Button>
        <Radio.Button value="fastest">Самый быстрый</Radio.Button>
        <Radio.Button value="optimal">Оптимальный</Radio.Button>
      </Radio.Group>
    </ConfigProvider>
  )
}

export default CostFilter
