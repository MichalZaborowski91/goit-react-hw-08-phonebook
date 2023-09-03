export const selectLoggedIn = state => state.auth.isLoggedIn;
export const selectUser = state => state.auth.user;
export const selectIsRefreshing = state => state.auth.isRefreshing;

//contacts selectors

export const selectContacts = state => state.auth.items;

export const selectIsLoading = state => state.auth.isLoading;

export const selectError = state => state.auth.error;

export const handlePending = state => {
  state.isLoading = true;
};

export const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
