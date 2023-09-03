import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'AUTH/REGISTER',
  async (registerData, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', registerData);
      setHeader(response.data.token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'AUTH/LOGIN',
  async (loginData, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', loginData);
      setHeader(response.data.token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'AUTH/REFRESH_USER',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    setHeader(token);
    try {
      const response = await axios.get('/users/current');
      if (response.response !== undefined && response.response.status === 401) {
        return 'error';
      } else {
        return response.data;
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logOut = createAsyncThunk('AUTH/LOG_OUT', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearToken();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

// contacts actions

export const fetchContacts = createAsyncThunk(
  'contacts/FETCH_ALL',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      setHeader(token);
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/ADD_CONTACT',
  async ({ name, number }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      setHeader(token);
      const response = await axios.post('/contacts', { name, number });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/DELETE_CONTACT',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
