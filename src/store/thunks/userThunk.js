import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../baseURL";
import axios from "axios";

const login = createAsyncThunk("users/fetch", async (user) => {
  const response = await axios.post(`${BASE_URL}user/login`, {
    ...user,
  });
  localStorage.setItem("token", response.data["access-token"]);
  localStorage.setItem("user", response.data["name"]);
  return response.data;
});

const addUser = createAsyncThunk("users/add", async (user) => {
  const response = await axios.post(`${BASE_URL}user/register`, {
    ...user,
  });
  return response.data;
});

const updateUser = createAsyncThunk("users/update", async (user) => {
  const response = await axios.put(BASE_URL + user.id, {
    ...user,
  });
  return response.data;
});

const logout = createAsyncThunk("users/logout", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
});

export { login, addUser, updateUser, logout };
