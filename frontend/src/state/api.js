import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `${process.env.REACT_APP_UserApiKey}`);
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: [
    "Announcements",
    "BecomeMember",
    "ProjectData",
    "EventData",
    "BecomeMemberData",
    "NewMember",
    "NewExecutiveMember",
    "NewJrSec",
    "NewCoSec",
    "NewSec",
    "NewData",
    "OngoingProjectData",
    "CompletedProjectData",
    "ShortAnnouncement"
  ],
  endpoints: (build) => ({
    getAnnouncements: build.query({
      query: () => "announcement/getAnnouncement",
      providesTags: ["Announcements"],
    }),
    getBecomeMember: build.query({
      query: () => "becomeMember/getbecomeMember",
      providesTags: ["BecomeMember"],
    }),
    getProjectData: build.query({
      query: () => "project/getProjectData",
      providesTags: ["ProjectData"],
    }),
    getEventData: build.query({
      query: () => "event/getEventData",
      providesTags: ["EventData"],
    }),
    getBecomeMemberData: build.query({
      query: () => "member/getbecomeMemberData",
      providesTags: ["BecomeMemberData"],
    }),
    getNewMember: build.query({
      query: () => "member/getnewMember",
      providesTags: ["NewMember"],
    }),
    getNewExecutiveMember: build.query({
      query: () => "member/getnewExecutiveMember",
      providesTags: ["NewExecutiveMember"],
    }),
    getNewJrSec: build.query({
      query: () => "member/getnewJrSec",
      providesTags: ["NewJrSec"],
    }),
    getNewCoSec: build.query({
      query: () => "member/getnewCoSec",
      providesTags: ["NewCoSec"],
    }),
    getNewSec: build.query({
      query: () => "member/getnewSec",
      providesTags: ["NewSec"],
    }),
    getNewData: build.query({
      query: () => "member/getnewData",
      providesTags: ["NewData"],
    }),
    getOngoingProjectData: build.query({
      query: () => "project/getOngoingProjectData",
      providesTags: ["OngoingProjectData"],
    }),
    getCompletedProjectData: build.query({
      query: () => "project/getCompletedProjectData",
      providesTags: ["CompletedProjectData"],
    }),
    getShortAnnouncement: build.query({
      query: () => "announcement/getShortAnnouncement",
      providesTags: ["ShortAnnouncement"],
    })
  }),
});

export const {
  useGetAnnouncementsQuery,
  useGetBecomeMemberQuery,
  useGetProjectDataQuery,
  useGetEventDataQuery,
  useGetBecomeMemberDataQuery,
  useGetNewCoSecQuery,
  useGetNewExecutiveMemberQuery,
  useGetNewJrSecQuery,
  useGetNewMemberQuery,
  useGetNewSecQuery,
  useGetNewDataQuery,
  useGetOngoingProjectDataQuery,
  useGetCompletedProjectDataQuery,
  useGetShortAnnouncementQuery,
} = api;
