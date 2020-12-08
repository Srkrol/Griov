import React from 'react'
import { Spin, Space } from 'antd'

export const Loader = () => {
  return (
    <div style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 100,
      background: '#e6f7ff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    >
    <Space size="large">
      <Spin size="large" />
    </Space>,
    </div>
  )
}