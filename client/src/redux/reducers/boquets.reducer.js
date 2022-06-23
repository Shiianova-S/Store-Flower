import {
  ADD_BOUQUET,
  DELETE_BOUQUET,
  UPDATE_BOUQUET,
  INIT_BOUQUETS
} from '../actionType/bouquetActionType'


export function bouquetsReducer(state = [], action) {
  
  switch (action.type) {

    case INIT_BOUQUETS: {
      return [...action.payload]
    }

    case ADD_BOUQUET:
      return [...state, action.payload]

    case DELETE_BOUQUET:
      return [...state].filter(bouquet => bouquet.id !== action.payload)

    case UPDATE_BOUQUET:
      return [...state.map(el => {
        if (el.id === action.payload.id) {
          return {
            ...el, 
            id: action.payload.id,
            title: action.payload.title, 
            description: action.payload.description,
            img: action.payload.img,
            price: action.payload.price,
            category_id: action.payload.category_id,
          }
        } else {
          return el
        }
      })]

    default: {
      return state
    }
  }
}
