import { createSlice } from '@reduxjs/toolkit';

const reportsSlice = createSlice({
  name: 'reports',
  initialState: {
    report_type: 'null',
    report: [],
    is_loading: false,
    is_saved: false,
    retrieved_reports: [],

    error: null,
  },
  reducers: {
    setReportType(state, action) {
      state.report_type = action.payload;
    },
    setReport(state, action) {
      state.report = action.payload;
    },
    setIsSaved(state, action) {
      state.is_saved = action.payload;
    },
    setGetReports(state, action) {
      state.retrieved_reports = action.payload;
    },
    setIsLoading(state, action) {
      state.is_loading = action.payload;
    },
    reportsRequestFailed(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});
export const {
  setReportType,
  setReport,
  setIsSaved,
  setGetReports,
  setIsLoading,
  reportsRequestFailed,
} = reportsSlice.actions;
export default reportsSlice.reducer;
