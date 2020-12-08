import {
  SET_USER_DATA,
  SET_USER_NAME_RE,
  SET_USER_IMG_RE,
  SET_USER_BOX_NAME_RE,
} from "../../../constants/store";

const initState = {
  user: null,
};

export const user = (state = initState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        user: action.user,
      };
    }
    case SET_USER_NAME_RE: {
      const copy = { ...state.user };
      copy.username = action.val;

      return {
        ...state,
        user: copy,
      };
    }
    case SET_USER_BOX_NAME_RE: {
      const copy = { ...state.user };
      copy.box[action.index].box_name = action.name;

      return {
        ...state,
        user: copy,
      };
    }
    case SET_USER_IMG_RE: {
      const copy = { ...state.user };
      copy.avatar = action.avatar;

      return {
        ...state,
        user: copy,
      };
    }
    default:
      return state;
  }
};
