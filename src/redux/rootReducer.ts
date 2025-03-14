import authSlice, { authSelectors } from "./auth/reducer";

const actions = {
  auth: authSlice.actions
}

const reducers = {
  auth: authSlice.reducer
}

const selectors = {
  ...authSelectors
}

export { actions, reducers, selectors }