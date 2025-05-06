import { createSlice } from '@reduxjs/toolkit';

interface IAuthModal {
  isModalOpen: boolean,
  isLoginForm: boolean,
}

const initialState: IAuthModal = {
  isModalOpen: false,
  isLoginForm: true,
};

export const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    isLoginForm: (state, action) =>{
      state.isLoginForm = action.payload;
    }
  },
});

export const { setIsModalOpen, isLoginForm } = authModalSlice.actions;
export default authModalSlice.reducer;
