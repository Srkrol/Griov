import { SET_COMMENT_BOX } from '../../../constants/store'

const initState = {
  comment: []
}

export const comm = ( state = initState, action ) => {
  switch (action.type) {
    case SET_COMMENT_BOX : {
        return {
            ...state,
            comment: action.comment
        }
    }
    default:
      return state
  }
}