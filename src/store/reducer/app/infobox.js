import { SET_USER_BOX_ADD, SET_USER_BOX_LOAD } from '../../../constants/store'

const initState = {
    box: []
}

export const infobox = ( state = initState, action ) => {
  switch (action.type) {
    case SET_USER_BOX_ADD: {
      const copy = [...state.box]
      copy.push(action.box)

      return {
        ...state,
        box: copy,
      }
    }
    case SET_USER_BOX_LOAD: {
        return {
          ...state,
          box: action.box,
        }
      }
    default:
      return state
  }
}
/**
    plants: pl[index].p_name,
    boxtype: addType[index],
    userId: user.id,
    date: String(addDate[index])

 */