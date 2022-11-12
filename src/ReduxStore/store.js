import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import editTemplateReducer from './Reducers/editTemplateReducer';
import aboutusReducer from './Reducers/aboutusReducer';
import editorReducer from "./Reducers/editorContent";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userReducer
  // ,userPermissionReducer 
} from './Reducers/userReducer';
import { roleAndPermision } from './Reducers/roleAndPermissionReduceer'
import { communityReducer } from './Reducers/communityReducer';
import { openEditorReducer } from "./Reducers/openEditorReducer";
import { modalReducer } from "./Reducers/modalReducer";
import { memberGroupReducer } from "./Reducers/memberGroupReducer";
import { renderCompReducer } from './Reducers/renderCompReducer';
import profileDataReducer from "./profileData/profileData.reducers";
import authReducer from './auth/auth.reducer';


const reducer = combineReducers({
  templateData: editTemplateReducer,
  aboutusData: aboutusReducer,
  editorReducer: editorReducer,
  userData: userReducer,
  communityData: communityReducer,
  openEditorReducer: openEditorReducer,
  modalReducer: modalReducer,
  memberGroupReducer: memberGroupReducer,
  renderCompReducer: renderCompReducer,
  roleAndPermision: roleAndPermision,
  // userPermissionReducer : userPermissionReducer,
  profileData: profileDataReducer,
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["auth", "pagination", "profile", "products", "category"],
  whitelist: ["auth", "profileData"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export default store;
