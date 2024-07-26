import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import adminSlice from "./slices/adminSlice";
import kennelSlice from "./slices/kennelSlice";
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";



const rootReducers = combineReducers({
    user:authSlice,
    admin:adminSlice,
    kennel:kennelSlice
})

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducers)

const store = configureStore({
    reducer:persistedReducer
})

const persistor = persistStore(store)

export {store,persistor}