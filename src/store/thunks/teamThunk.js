import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, getToken } from "../baseURL";
import axios from "axios";

const fetchTeam = createAsyncThunk("teams/fetchTeam", async () => {
  const response = await axios.get(`${BASE_URL}team/all`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data.teams;
});

const addTeam = createAsyncThunk("teams/addTeam", async (team) => {
  const response = await axios.post(
    `${BASE_URL}team/create`,
    {
      ...team,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
});

const updateTeam = createAsyncThunk("teams/updateTeam", async (team) => {
  const response = await axios.put(
    `${BASE_URL}team/edit`,
    {
      ...team,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
});

const removeTeam = createAsyncThunk("teams/removeTeam", async (team) => {
  const response = await axios.post(
    `${BASE_URL}team/remove`,
    {
      ...team,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
});

export { fetchTeam, addTeam, updateTeam, removeTeam };
