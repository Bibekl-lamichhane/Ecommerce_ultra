import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  token: null,
  userDetails: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.userDetails = action.payload.users
      state.token = action.payload.token
    },
    setLogout(state) {
      state.token=null,
      state.userDetails =''
      
    },
  }
})

export const { setUserDetails, setLogout } = userSlice.actions

export default userSlice.reducer