import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userSlice from './userSlice'
import postSlice from './postSlice'
import { userApi } from '../services/userApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { followersandpostsApi } from '../services/postsApi'
import { commentsApi } from '../services/commentsApi'
import { storiesApi } from '../services/storiesApi'

const persistConfig = {
	key: 'root',
	storage
}

const rootReducer = combineReducers({
	user: userSlice,
	posts: postSlice,
	[userApi.reducerPath]: userApi.reducer,
	[followersandpostsApi.reducerPath]: followersandpostsApi.reducer,
	[commentsApi.reducerPath]: commentsApi.reducer,
	[storiesApi.reducerPath]: storiesApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(userApi.middleware)
			.concat(followersandpostsApi.middleware)
			.concat(commentsApi.middleware)
			.concat(storiesApi.middleware)
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)
