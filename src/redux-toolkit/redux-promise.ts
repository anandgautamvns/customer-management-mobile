import { Dispatch, MiddlewareAPI } from "redux";
type PromiseAction = { type: string; promise: true };
type RegularAction = { type: string; promise?: false };

type AppAction = PromiseAction | RegularAction;

type InferActionType<T> = T extends { promise: true }
  ? PromiseAction
  : RegularAction;
type DispatchResult<T> = T extends { promise: true }
  ? Promise<unknown>
  : unknown;

export interface AppDispatch extends Dispatch {
  <T extends AppAction>(action: T): DispatchResult<InferActionType<T>>;
}

const promiseMiddleware: any =
  (store: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
    if (typeof action.then !== "function") {
      return next(action);
    }
    return Promise.resolve(action).then(
      (value) =>
        new Promise((resolve, reject) =>
          store.dispatch({ ...value, meta: { resolve, reject } })
        )
    );
  };

export default promiseMiddleware;
