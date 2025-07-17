import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  isError: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      const { message, isError } = action.payload;
      console.log("notification for: ", message);
      return {
        message,
        isError,
      };
    },

    resetNotification() {
      console.log("reset notification");
      return initialState;
    },
  },
});

export const notify = (message, isError = false, notifyTimeSeconds = 5) => {
  return (dispatch) => {
    dispatch(setNotification({ message, isError }));

    setTimeout(() => {
      dispatch(resetNotification());
    }, notifyTimeSeconds * 1000);
  };
};

export const { setNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
