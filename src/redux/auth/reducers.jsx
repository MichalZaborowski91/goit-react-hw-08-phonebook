import { handlePending, handleRejected } from './selectors';

const { createReducer } = require('@reduxjs/toolkit');
const {
  register,
  logIn,
  refreshUser,
  logOut,
  fetchContacts,
  addContact,
  deleteContact,
} = require('./actions');

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  items: [],
  error: null,
  isLoading: false,
};

export const authReducer = createReducer(initialState, {
  [register.fulfilled]: (state, action) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.isLoggedIn = true;
  },
  [logIn.fulfilled]: (state, action) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.isLoggedIn = true;
  },
  [refreshUser.pending]: state => {
    state.isRefreshing = true;
  },
  [refreshUser.fulfilled]: (state, action) => {
    state.error = null;
    state.isRefreshing = false;
    if (action.payload !== 'error') {
      state.user = action.payload;
      state.isLoggedIn = true;
    }
  },
  [logOut.fulfilled]: state => {
    state.user = { name: null, email: null };
    state.token = null;
    state.isLoggedIn = false;
    state.isRefreshing = false;
  },

  // contacts reducers

  [fetchContacts.pending]: handlePending,
  [fetchContacts.fulfilled]: (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.items = action.payload;
  },
  [fetchContacts.rejected]: handleRejected,

  [addContact.pending]: handlePending,
  [addContact.fulfilled]: (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.items.push(action.payload);
  },
  [addContact.rejected]: handleRejected,

  [deleteContact.pending]: handlePending,
  [deleteContact.fulfilled]: (state, action) => {
    state.isLoading = false;
    state.error = null;
    const index = state.items.findIndex(
      contact => contact.id === action.payload.id
    );
    state.items.splice(index, 1);
  },
  [deleteContact.rejected]: handleRejected,
});
