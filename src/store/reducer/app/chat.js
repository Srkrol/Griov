import { SET_CHAT_DATA } from "../../../constants/store";

const initState = {
  data: false,
};

export const chat = (state = initState, action) => {
  switch (action.type) {
    case SET_CHAT_DATA: {
      return {
        ...state,
        data: action.data,
      };
    }
    default:
      return state;
  }
};
