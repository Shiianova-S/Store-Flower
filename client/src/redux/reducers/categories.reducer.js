import { INIT_CATEGORIES } from './../actionType/categoriesActionType'

export const categoriesReducer = (state = [], action) => {
  switch (action.type) {

    case INIT_CATEGORIES:{
      return [...action.payload]
    }
    
    default:
      return state
  }
}
