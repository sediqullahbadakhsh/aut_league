// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, getToken } from "../baseURL";

export const teamMemberApi = createApi({
  reducerPath: "teamMemberApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${getToken()}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addTeamMember: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "team/member/add",
          method: "POST",
          body: {
            "team-id": data.teamId,
            "member-id": data.memberId,
          },
        };
      },
    }),
    removeTeamMember: builder.mutation({
      query: ({ teamId, memberId }) => {
        console.log("team,", teamId, "member,", memberId);
        return {
          url: "team/member/remove",
          method: "POST",
          body: {
            "team-id": teamId,
            "member-id": memberId,
          },
        };
      },
    }),
  }),
});

export const { useAddTeamMemberMutation, useRemoveTeamMemberMutation } =
  teamMemberApi;
