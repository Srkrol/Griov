import {
  SET_TAB_ACTIVE,
  SET_TAB_DATE,
  SET_TAB_GET,
  SET_TAB_UPDATE,
  SET_TAB_VALUE,
  SET_TAB_DAILY,
  SET_TAB_DELETE
} from "../../../constants/store";

const initState = {
  active: 0,
  table: [],
};

export const tabs = (state = initState, action) => {
  switch (action.type) {
    case SET_TAB_DATE: {
      const copystate = [...state.table];
      copystate[action.active].dt = action.date;
      return {
        ...state,
        table: copystate,
      };
    }
    case SET_TAB_VALUE: {
      const copystate = [...state.table];
      copystate[action.active].value = action.value;
      return {
        ...state,
        table: copystate,
      };
    }
    case SET_TAB_DAILY: {
      const copystate = [...state.table];
      copystate[action.active].daily = action.daily;
      return {
        ...state,
        table: copystate,
      };
    }
    case SET_TAB_ACTIVE: {
      return {
        ...state,
        active: action.active,
      };
    }
    case SET_TAB_DELETE: {

      const copystate = [...state.table];
      let tab = []
      copystate.forEach((val) => {
        if(action.id !== val.id) {
          tab.push(val)
        }
      })
      return {
        ...state,
        table: tab,
      };
    }
    case SET_TAB_GET: {
      return {
        ...state,
        table: action.table,
      };
    }
    case SET_TAB_UPDATE: {
      const copy = [...state.table];
      copy[action.active] = action.table;
      return {
        ...state,
        table: copy,
      };
    }
    default:
      return state;
  }
};
