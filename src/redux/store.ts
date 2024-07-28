import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import unitSlice from "./slices/unitSlice";
import unitSaga from "./saga/unitSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    unit:unitSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),

});

sagaMiddleware.run(unitSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;