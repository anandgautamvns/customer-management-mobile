import authSlice, { authSelectors } from "./auth/reducer";
import customerSlice, { customerSelectors } from "./customer/reducer";

const actions = {
  auth: authSlice.actions,
  customer: customerSlice.actions
}

const reducers = {
  auth: authSlice.reducer,
  customer: customerSlice.reducer
}

const selectors = {
  ...authSelectors,
  ...customerSelectors
}

export { actions, reducers, selectors }