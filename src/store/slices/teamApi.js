// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, getToken } from "../baseURL";

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${getToken()}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchTeams: builder.query({
      query: () => "team/all",
      transformResponse: (response) => response.teams,
    }),
    addTeam: builder.mutation({
      query: (team) => ({
        url: "team/create",
        method: "POST",
        body: team,
      }),
      invalidatesTags: [{ type: "fetchTeams" }], // Invalidate the fetchTeams query cache after adding a team
    }),
    updateTeam: builder.mutation({
      query: (team) => ({
        url: "team/edit",
        method: "PUT",
        body: team,
      }),
      invalidatesTags: [{ type: "fetchTeams" }], // Invalidate the fetchTeams query cache after updating a team
    }),
    removeTeam: builder.mutation({
      query: (team) => ({
        url: "team/remove",
        method: "POST",
        body: team,
      }),
      invalidatesTags: [{ type: "fetchTeams" }], // Invalidate the fetchTeams query cache after removing a team
    }),
  }),
});

export const {
  useFetchTeamsQuery,
  useAddTeamMutation,
  useUpdateTeamMutation,
  useRemoveTeamMutation,
} = teamApi;
