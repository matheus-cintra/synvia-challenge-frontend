import { createStore, applyMiddleware } from 'redux';

export default (reducers, middlwares) => {
  const enhancer = applyMiddleware(...middlwares);
  return createStore(reducers, enhancer);
};
