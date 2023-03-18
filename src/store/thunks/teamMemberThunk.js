import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, getToken } from "../baseURL";
import axios from "axios";

const addTeamMember = createAsyncThunk(
  "teamMember/add",
  async ({ teamId, memberId }, thunkAPI) => {
    const response = await axios.post(
      `${BASE_URL}team/member/add`,
      {
        "team-id": teamId,
        "member-id": memberId,
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

const removeTeamMember = createAsyncThunk(
  "teamMember/remove",
  async ({ teamId, rmemberId }, thunkAPI) => {
    const response = await axios.post(
      `${BASE_URL}team/member/remove`,
      {
        "team-id": teamId,
        "member-id": rmemberId,
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

export { addTeamMember, removeTeamMember };
