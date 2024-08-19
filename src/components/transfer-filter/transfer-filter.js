import React from 'react'
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox, ConfigProvider } from 'antd'

import { transferFilterUpdate } from '../../store/actions'

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
  const dispatch = useDispatch()
  const { filterUpdateDispatch } = bindActionCreators({ filterUpdateDispatch: transferFilterUpdate }, dispatch)
  const numTransfersArr = useSelector((state) => state.numTransfersArr)

  const checkAll = options.length === numTransfersArr.length

  const onChange = (list) => {
    // dispatch(transferFilterUpdate(list))
    filterUpdateDispatch(list)
  }
  const onCheckAllChange = (e) => {
    // dispatch(transferFilterUpdate(e.target.checked ? options.map((opt) => opt.value) : []))
    filterUpdateDispatch(e.target.checked ? options.map((opt) => opt.value) : [])
  }

  return (
    <aside className={stl['body']}>
      <p className={stl['label']}>Количество пересадок</p>
      <ConfigProvider
        theme={{
          components: {
            Checkbox: {
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
        <Checkbox.Group value={numTransfersArr} onChange={onChange} options={options} />
      </ConfigProvider>
    </aside>
  )
}

export default TransferFilter
