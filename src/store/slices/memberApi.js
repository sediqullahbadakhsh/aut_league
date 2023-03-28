// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, getToken } from "../baseURL";

export const memberApi = createApi({
  reducerPath: "memberApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${getToken()}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchMembers: builder.query({
      query: () => "member/all",
      transformResponse: (response) => response.members,
    }),
    addMember: builder.mutation({
      query: ({ name, lname, age, phone, email }) => ({
        url: "member/add",
        method: "POST",
        body: {
          "first-name": name,
          "last-name": lname,
          age,
          phone,
          email,
        },
      }),
      invalidatesTags: [{ type: "fetchMembers" }],
    }),
    updateMember: builder.mutation({
      query: ({ id, name, lname, age, phone, email }) => ({
        url: "member/edit",
        method: "PUT",
        body: {
          id,
          "first-name": name,
          "last-name": lname,
          age,
          phone,
          email,
        },
      }),
      invalidatesTags: [{ type: "fetchMembers" }],
    }),
    removeMember: builder.mutation({
      query: (member) => ({
        url: "member/remove",
        method: "POST",
        body: member,
      }),
      invalidatesTags: [{ type: "fetchMembers" }],
    }),
  }),
});

export const {
  useFetchMembersQuery,
  useAddMemberMutation,
  useUpdateMemberMutation,
  useRemoveMemberMutation,
} = memberApi;
