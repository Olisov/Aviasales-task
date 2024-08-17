import { React } from 'react'
import { Radio, ConfigProvider } from 'antd'
// import classNames from 'classnames'

import stl from './cost-filter.module.scss'

const onChange = (e) => {
  console.log(`radio checked:${e.target.value}`)
}

function CostFilter() {
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
      <Radio.Group className={stl['radio-group']} onChange={onChange} defaultValue="cheapest">
        <Radio.Button value="cheapest">Самый дешёвый</Radio.Button>
        <Radio.Button value="fastest">Самый быстрый</Radio.Button>
        <Radio.Button value="optimal">Оптимальный</Radio.Button>
      </Radio.Group>
    </ConfigProvider>
  )
}

export default CostFilter
