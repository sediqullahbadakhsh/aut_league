import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../baseURL";
import axios from "axios";
const token = localStorage.getItem("token");

const fetchTeam = createAsyncThunk("team/fetch", async () => {
  const response = await axios.get(`${BASE_URL}team/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("from thunk", response.data);
  return response.data;
});

const addTeam = createAsyncThunk("team/add", async (team) => {
  const response = await axios.post(
    `${BASE_URL}team/create`,
    {
      ...team,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
});

const updateTeam = createAsyncThunk("team/update", async (team) => {
  const response = await axios.put(
    `${BASE_URL}team/edit`,
    {
      ...team,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
});

const removeTeam = createAsyncThunk("team/remove", async (team) => {
  const response = await axios.post(
    `${BASE_URL}team/remove`,
    {
      ...team,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
});

export { fetchTeam, addTeam, updateTeam, removeTeam };
