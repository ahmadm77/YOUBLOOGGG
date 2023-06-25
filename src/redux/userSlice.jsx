import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  value: {
    email: "",
    phone: "",
    username: "",
    password: "",
    imgProfile: "",
  },
};

const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        setValue: (state,action) => {
            state.value.email = action.payload.email
            state.value.phone = action.payload.phone
            state.value.username = action.payload.username
            state.value.password = action.payload.password
            state.value.imgProfile = action.payload.imgProfile
        }
    }
})
export const { setValue } = userSlice.actions
export default userSlice.reducer
