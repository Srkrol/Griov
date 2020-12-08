import { SET_LADDER_USER } from '../../../constants/store'

const initState = {
  user: null
}

export const ladderuser = ( state = initState, action ) => {
  switch (action.type) {
    case SET_LADDER_USER : {
      return {
        ...state,
        user: action.user
      }
    }
    default:
      return state
  }
}