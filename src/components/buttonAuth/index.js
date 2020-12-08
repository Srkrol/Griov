import React from 'react'
import { useSelector } from 'react-redux'
import { EnterAuth } from './enter'
import { ExitAuth } from './exit'

import { roleNoAuth, roleAuth } from '../../setting/routes'

export const ButtonAuth = () => {

  const role = useSelector(state => state.role.roleActive)
  
  const butonOne = roleNoAuth.role === role? true : false
  const buttonTwo = roleAuth.role === role? true : false

  return (
    <>
      {
        butonOne?
          <EnterAuth />
        : null
      }
            {
        buttonTwo?
          <ExitAuth />
        : null
      }
    </>
  )
}