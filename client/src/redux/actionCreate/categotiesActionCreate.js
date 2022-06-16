import { INIT_CATEGORIES } from "../actionType/categoriesActionType";

export const initCategories = (payload) => {
  return {
    type: INIT_CATEGORIES,
    payload
  }
}