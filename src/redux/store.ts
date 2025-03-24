import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import logger from "redux-logger";
import createSagaMiddleware, { Middleware } from "redux-saga";
import promiseMiddleware from "./redux-promise";
import { reducers } from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middleware: Middleware[] = [sagaMiddleware, promiseMiddleware];
const middlewareEnhancer = applyMiddleware(sagaMiddleware, promiseMiddleware);
if (process.env.NODE_ENV === "development") {
  middleware.push(logger as Middleware); // Cast logger to Middleware type
}

const store = configureStore({
  devTools: false,
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(middleware),
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();

export default store;
