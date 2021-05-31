export const SET_DATA = "SET_DATA";

export const initialState = {
  answers: [],
  pangrams: [],
}

export function reducer(state, action) {
  switch (action.type) {
    case SET_DATA:
      const { answers, pangrams } = action.payload;

      return { answers, pangrams };
    default:
      throw new Error();
  }
}