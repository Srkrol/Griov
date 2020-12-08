import { SET_TAB_ADD_VALUE, SET_TAB_ADD_DATE, SET_TAB_ADD_PARAM } from '../../../constants/store'

const initState = {
    active: false,
    tab: {
        date: new Date(),
        daily: 0,
        param: 0,
        device:  '',
        value: 0,
    }
}

export const addevent = ( state = initState, action ) => {
  switch (action.type) {
    case SET_TAB_ADD_DATE : {
        const copy = {...state.tab}
        copy.date = action.date
        
        return {
            ...state,
            tab: copy
        }
    }
    case SET_TAB_ADD_PARAM : {
        const copy = {...state.tab}
        copy.param = action.param
        copy.device = action.device
        
        return {
            ...state,
            tab: copy
        }
    }
    case SET_TAB_ADD_VALUE : {
        const copy = {...state.tab}
        copy.value = action.value

        return {
            ...state,
            tab: copy
        }
    }
    default:
      return state
  }
}