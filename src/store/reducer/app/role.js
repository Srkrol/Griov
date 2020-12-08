import { roleNoAuth, roleAuth } from '../../../setting/routes'
import { SET_ROLE_SESSION  } from '../../../constants/store'

const initState = {
  roleActive:  roleNoAuth.role ,
  roleRoute: [
    { role: roleNoAuth.role },
    { role: roleAuth.role },
  ]
}

export const role = ( state = initState, action ) => {
  switch (action.type) {
    case SET_ROLE_SESSION : {
      return {
        ...state,
        roleActive: action.roleActive,
      }
    }
    default:
      return state
  }
}