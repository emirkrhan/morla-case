import { legacy_createStore as createStore, combineReducers } from 'redux';
import productReducer from './reducers';
import sepetReducers from './sepetReducers';

const rootReducer = combineReducers({
    products: productReducer,
    sepet: sepetReducers,
  });
  
  const store = createStore(rootReducer);
  

export default store;
