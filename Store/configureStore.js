import { createStore } from 'redux';
import toggleFavorite from './Reducers/favoriteReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
    key: 'root',
    storage: storage
}
const persistedReducer = persistReducer(rootPersistConfig, toggleFavorite)
export default createStore(persistedReducer)