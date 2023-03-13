import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../baseURL";
import axios from "axios";

const login = createAsyncThunk("users/fetch", async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}user/login`, {
      ...user,
    });
    localStorage.setItem("token", response.data["access-token"]);
    localStorage.setItem("user", response.data["name"]);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const addUser = createAsyncThunk("users/add", async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}user/register`, {
      ...user,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

const logout = createAsyncThunk("users/logout", async () => {
  await Promise.resolve();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
});

export { login, addUser, logout };
