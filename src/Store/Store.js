import { configureStore } from '@reduxjs/toolkit';
import customerReducer from "./Slice"

const store = configureStore({
  reducer: customerReducer,
});

export default store; 