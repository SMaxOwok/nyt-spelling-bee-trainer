export const SET_DATA = "SET_DATA";
export const SET_FOUND = "SET_FOUND";

export const initialState = {
  answers: [],
  pangrams: [],
  found: []
}

export function reducer(state, action) {
  switch (action.type) {
    case SET_DATA:
      const { answers, pangrams } = action.payload;

      return { ...state, answers, pangrams };
    case SET_FOUND:
      return { ...state, found: action.payload };
    default:
      throw new Error();
  }
}