import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  detailsOfReciever:[]
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setdetailsOfReciever(state, action) {
      console.log(action.payload)
      state.detailsOfReciever = action.payload
    },
   
  }
})

export const {setdetailsOfReciever} = messageSlice.actions

export default messageSlice.reducer