import React, { useState } from 'react'
import { Button } from "antd";
import { useAuth0 } from "@auth0/auth0-react"

export const EnterAuth = () => {

  const { loginWithRedirect } = useAuth0()
  const [ disable, setDisable ] = useState(false)
  const Click = async () =>  {
    setDisable(true)
    await loginWithRedirect()
  } 
  return (
    <Button
      loading={disable}
      disabled={disable}
      onClick={() => Click()}
      style={{
        background: 'white',
        borderRadius: '5px',
        minHeight: '35px',
        minWidth: '110px',
        fontSize: '16px'
      }}
    >
      Вход/Регистрация
    </Button>
  )
}