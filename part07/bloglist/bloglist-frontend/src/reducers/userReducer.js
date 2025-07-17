import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      console.log("logging in... setting user");
      return action.payload;
    },
    resetUser() {
      console.log("logging out.. resetting user");
      return null;
    },
  },
});

export const userLogin = (user) => {
  return (dispatch) => {
    dispatch(setUser(user));
  };
};
export const userLogout = () => {
  return (dispatch) => {
    dispatch(resetUser());
  };
};

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
