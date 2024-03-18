import { createSlice } from "@reduxjs/toolkit";
import setFalseFields from "../../../utils/setFalseFields";

const initialState = ({
  data: [],
  filter: {
    query: '',
    university: false,
    universityValue: '',
    name: true,
    year: false,
    economic: '',
    page: 1,
  },
  query: {
    name: '',
    economic: '',
  },
});


const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload;
    },
    setUsersFilter: (state, action) => {
      if (action.payload.university && Object.prototype.hasOwnProperty.call(action.payload, 'universityValue')) {
        const filteredObject = setFalseFields(state);
        state.filter = { ...state.filter, ...filteredObject, ...action.payload };
        return;
      }

      if (Object.prototype.hasOwnProperty.call(action.payload, 'query')) {
        state.filter = { ...state.filter, ...action.payload };
        return;
      }

      if (action.payload.university || action.payload.year || action.payload.name) {
        const filteredObject = setFalseFields(state);
        state.filter = { ...state.filter, ...filteredObject, ...action.payload, query: '', universityValue: '' };
        return;
      }

      if (Object.prototype.hasOwnProperty.call(action.payload, 'economic')) {
        state.filter = { ...state.filter, ...action.payload };
        return;
      }
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setUsers, setUsersFilter, setQuery } = usersSlice.actions;

export default usersSlice.reducer;
