import {
  SET_DEVICE_ADMINPANEL,
  SET_CURENT_PHOTO_ADMINPANEL,
  SET_DEVICE_ADMINPANEL_DEFAULT,
  SET_DEVICE_ADMINPANEL_HISTORY,
  SET_RATING_PHOTO_ADMINPANEL,
  SET_ADMIN_PANEL_WIDTH,
} from "../../../constants/store";
import { sort } from "../action/adminpanel";

const initState = {
  dev: [
    { variant: "onoff", device: [] },
    { variant: "box", device: [] },
    { variant: "passive", device: [] },
    { variant: "interval", device: [] },
    { variant: "cam", device: [] },
  ],
  photo: "",
  photorating: "",
  lkhistory: false,
  width: 80,
};

export const device = (state = initState, action) => {
  switch (action.type) {
    case SET_DEVICE_ADMINPANEL: {
      const res = sort(action.data, state.dev);
      return {
        ...state,
        dev: res,
      };
    }

    case SET_ADMIN_PANEL_WIDTH: {
      return {
        ...state,
        width: action.width,
      };
    }

    case SET_CURENT_PHOTO_ADMINPANEL: {
      return {
        ...state,
        photo: action.photo,
      };
    }
    case SET_RATING_PHOTO_ADMINPANEL: {
      return {
        ...state,
        photorating: action.photorating,
      };
    }
    case SET_DEVICE_ADMINPANEL_HISTORY: {
      return {
        ...state,
        lkhistory: action.lkhistory,
      };
    }
    case SET_DEVICE_ADMINPANEL_DEFAULT: {
      return {
        dev: [
          { variant: "onoff", device: [] },
          { variant: "box", device: [] },
          { variant: "passive", device: [] },
          { variant: "interval", device: [] },
          { variant: "cam", device: [] },
        ],
        photo: "",
        photorating: "",
        lkhistory: false,
        width: 80,
      };
    }
    default:
      return state;
  }
};
