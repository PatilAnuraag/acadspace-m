import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use local storage for persistence

import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
  key: 'root', // key for the root of the store in local storage
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
const persistor = persistStore(store); // This will create a persistor object used to persist the store


export { store, persistor };
