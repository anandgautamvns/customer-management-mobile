import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {reducers} from './rootReducer';
import rootSaga from './rootSaga';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  devTools: false,
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export default store;