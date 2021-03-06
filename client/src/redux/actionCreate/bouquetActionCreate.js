import { ADD_BOUQUET,
  INIT_BOUQUETS,
  DELETE_BOUQUET,
  UPDATE_BOUQUET } from "../actionType/bouquetActionType";

export const addBouquet = (payload) => {
  return {
    type: ADD_BOUQUET,
    payload
  }
}
export const updateBouquet = (payload) => {
  return {
    type: UPDATE_BOUQUET,
    payload
  }
}
export const deleteBouquet = (payload) => {
  return {
    type: DELETE_BOUQUET,
    payload
  }
}
export const initBouquets = (payload) => {
  return {
    type: INIT_BOUQUETS,
    payload
  }
}
