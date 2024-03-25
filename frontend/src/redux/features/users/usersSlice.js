import { createSlice } from "@reduxjs/toolkit";
import setFalseFields from "../../../utils/setFalseFields";

const initialState = ({
  data: [],
  filter: {
    query: '',
    letter: '',
    year: false,
    name: true,
    university: false,
    economic: false,
    universityValue: '',
    economicValue: '',
  },
  query: {
    name: '',
    letter: '',
    page: 1,
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
      // if (action.payload.university && Object.prototype.hasOwnProperty.call(action.payload, 'universityValue')) {
      //   const filteredObject = setFalseFields(state);
      //   state.filter = { ...state.filter, ...filteredObject, ...action.payload };
      //   return;
      // }

      if (Object.prototype.hasOwnProperty.call(action.payload, 'query')) {
        state.filter = { ...state.filter, ...action.payload };
        return;
      }

      if (action.payload.university || action.payload.year || action.payload.name || action.payload.economic) {
        console.log('Привет');
        const filteredObject = setFalseFields(state);
        state.filter = { ...state.filter, ...filteredObject, ...action.payload, query: '', universityValue: '', economicValue: '' };
        return;
      }

      // if (Object.prototype.hasOwnProperty.call(action.payload, 'economic')) {
      //   state.filter = { ...state.filter, ...action.payload };
      //   return;
      // }

      if (Object.prototype.hasOwnProperty.call(action.payload, 'letter')) {
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
