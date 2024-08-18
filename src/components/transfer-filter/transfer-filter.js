import React, { useState } from 'react'
import { Checkbox, ConfigProvider } from 'antd'
// import classNames from 'classnames'

import stl from './transfer-filter.module.scss'

function TransferFilter() {
  const options = [
    {
      label: 'Без пересадок',
      value: '0',
    },
    {
      label: '1 пересадка',
      value: '1',
    },
    {
      label: '2 пересадки',
      value: '2',
    },
    {
      label: '3 пересадки',
      value: '3',
    },
  ]

  const defaultCheckedList = ['0', '2']

  const [checkedList, setCheckedList] = useState(defaultCheckedList)
  const checkAll = options.length === checkedList.length

  const onChange = (list) => {
    setCheckedList(list)
  }
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? options.map((opt) => opt.value) : [])
  }

  return (
    <aside className={stl['body']}>
      <p className={stl['label']}>Количество пересадок</p>
      <ConfigProvider
        theme={{
          components: {
            Checkbox: {
              // fontFamily: 'Open Sans, sans-serif',
              fontSize: '13px',
              lineHeight: '20px',
              colorPrimary: 'white',
              colorBorder: '#9ABBCE',
              colorPrimaryBorder: 'black',
              controlInteractiveSize: '20px',
              colorPrimaryHover: 'white',
            },
          },
        }}
      >
        <Checkbox className={stl['check-all-item']} onChange={onCheckAllChange} checked={checkAll}>
          Все
        </Checkbox>
        <Checkbox.Group value={checkedList} onChange={onChange} options={options} />
      </ConfigProvider>
    </aside>
  )
}

export default TransferFilter
