import { SET_LADDER_COMP, SET_LADDER_BOXACTIVE, SET_LADDER_TOP } from "../../../constants/store";

const initState = {
  event: [],
  top: []
};

export const ladder = (state = initState, action) => {
  switch (action.type) {
    case SET_LADDER_COMP: {
      const arr = action.event
      console.log(action)
      arr.map(val => {
     
        return {
          box: val.box,
          boxselect: !!action.select.box_id? action.select.box_id : '',
          comp: val.comp,
          top: val.top,
        }
      })
      return {
        ...state,
        event: arr
      };
    }
    case SET_LADDER_BOXACTIVE: {
      const copy = [...state.event]
      copy[action.index].boxselect = action.box
      return {
        ...state,
        event: copy
      };
    }
    case SET_LADDER_TOP: {

      return {
        ...state,
        top: action.top
      };
    }
    default:
      return state;
  }
};
