import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, getToken } from "../baseURL";
import axios from "axios";

const fetchMember = createAsyncThunk("member/fetch", async () => {
  const response = await axios.get(`${BASE_URL}member/all`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
});

const addMember = createAsyncThunk(
  "member/add",
  async ({ name, lname, age, phone, email }, thunkAPI) => {
    const response = await axios.post(
      `${BASE_URL}member/add`,
      {
        "first-name": name,
        "last-name": lname,
        age,
        phone,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  }
);

const updateMember = createAsyncThunk(
  "member/edit",
  async ({ id, name, lname, age, phone, email }, thunkAPI) => {
    const response = await axios.put(
      `${BASE_URL}member/edit`,
      {
        id,
        "first-name": name,
        "last-name": lname,
        age,
        phone,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return response.data;
  }
);

const removeMember = createAsyncThunk("member/remove", async (member) => {
  const response = await axios.post(
    `${BASE_URL}member/remove`,
    {
      ...member,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
});

export { fetchMember, addMember, updateMember, removeMember };
