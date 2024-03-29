import { legacy_createStore as createStore, combineReducers } from 'redux';
import sepetReducers from './sepetReducers';

const rootReducer = combineReducers({
    sepet: sepetReducers
  });
  
  const store = createStore(rootReducer);
  

export default store;
