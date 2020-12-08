import { CREATE_BOX_ADD, CREATE_BOX_UPDATE, CREATE_BOX_ADD_PLANTS, CREATE_BOX_UPDATE_PLANTS, CREATE_BOX_UPDATE_TYPE } from '../../../constants/store'

const initState = {
  activeplant: false,
  addplant: false,
  plants: [],
  boxs: []
}

export const createbox = ( state = initState, action ) => {
  switch (action.type) {
    case CREATE_BOX_ADD : {
      return {
        ...state,
        boxs: action.boxs
      }
    }
    case CREATE_BOX_UPDATE : {
      const copy = [...state.boxs]
      copy[action.boxs].active = action.box
      copy[action.boxs].add = copy[action.boxs].box[action.box]
      
      return {
        ...state,
        boxs: copy
      }
    }
    case CREATE_BOX_UPDATE_TYPE : {
      const copy = [...state.boxs]
      copy[action.boxs].box[action.box].selectedadd = action.typeval

      
      return {
        ...state,
        boxs: copy
      }
    }
    case CREATE_BOX_ADD_PLANTS : {
      return {
        ...state,
        plants: action.plants
      }
    }
    case CREATE_BOX_UPDATE_PLANTS : {
      return {
        ...state,
        activeplant: action.index,
        addplant: action.plants
      }
    }
    default:
      return state
  }
}