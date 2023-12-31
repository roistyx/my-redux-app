import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import searchReducer from '../features/Search/searchSlice';
import newsReducer from '../features/News/newsSlice';
import drawerReducer from '../features/Drawer/drawerSlice';
import reportsSlice from '../features/Financials/fiancialReportsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    news: newsReducer,
    drawer: drawerReducer,
    reports: reportsSlice,
  },
});
