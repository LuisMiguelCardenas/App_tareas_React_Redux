import { types } from "../types/types";

const initialState = {
  loading: false,
  msError: null,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        msError: action.payload,
      };
    case types.uiRemoveError:
      return {
        ...state,
        msError: null,
      };
    case types.uiStartLoading:
      return {
        ...state,
        loading: true,
      };
    case types.uiFinishLoading:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
