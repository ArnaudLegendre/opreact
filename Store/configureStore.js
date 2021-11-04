import { createStore } from 'redux';
import toggleFavorite from './Reducers/favoriteReducer'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
}
const persistedReducer = persistReducer(rootPersistConfig, toggleFavorite)
export default createStore(persistedReducer)