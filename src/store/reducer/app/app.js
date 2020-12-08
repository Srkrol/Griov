import { SET_FETCH_COMM } from "../../../constants/store";

const initState = {
  fetchcomm: null,
};

export const app = (state = initState, action) => {
  switch (action.type) {
    case SET_FETCH_COMM: {
      return {
        ...state,
        fetchcomm: action.fetchcomm
      };
    }
    default:
      return state;
  }
};
