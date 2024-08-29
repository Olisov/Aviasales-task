import { React } from 'react'
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox, ConfigProvider } from 'antd'

import { transferFilterUpdate, numTransferName } from '../../store/reducers'

import stl from './transfer-filter.module.scss'

function TransferFilter() {
  const options = [
    {
      label: 'Без пересадок',
      value: numTransferName.NO_TRANSFERS,
    },
    {
      label: '1 пересадка',
      value: numTransferName.ONE_TRANSFER,
    },
    {
      label: '2 пересадки',
      value: numTransferName.TWO_TRANSFERS,
    },
    {
      label: '3 пересадки',
      value: numTransferName.THREE_TRANSFERS,
    },
  ]

  const dispatch = useDispatch()
  const { filterUpdateDispatch } = bindActionCreators({ filterUpdateDispatch: transferFilterUpdate }, dispatch)
  const { numTransfersFilter } = useSelector((state) => state.filters)

  const checkAll = options.length === numTransfersFilter.length

  const onChange = (list) => {
    filterUpdateDispatch(list)
  }
  const onCheckAllChange = (e) => {
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
        <Checkbox.Group value={numTransfersFilter} onChange={onChange} options={options} />
      </ConfigProvider>
    </aside>
  )
}

export default TransferFilter
