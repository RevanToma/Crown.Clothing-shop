// import { compose, applyMiddleware, createStore } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// const middleWares = [logger];
// const composedEnhancers = compose(applyMiddleware(...middleWares));
// export const store = createStore(rootReducer, undefined, composedEnhancers);

export const store = configureStore({
  reducer: rootReducer,
  middleware: [logger],
});
