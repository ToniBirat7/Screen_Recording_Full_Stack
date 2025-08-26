"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { apiFetch, withErrorHandling, getEnv } from "../utils";
import { BUNNY } from "@/constants";

// Keys and Links
const VIDEO_STREAM_BASE_URL = BUNNY.STREAM_BASE_URL;
const THUMBNAIL_STORAGE_BASE_URL = BUNNY.STORAGE_BASE_URL;
const THUMBNAIL_CDN_URL = BUNNY.CDN_URL;
const BUNNY_LIBRARY_ID = getEnv("BUNNY_LIBRARY_ID");
const ACCESS_KEY = {
  streamAccessKey: getEnv("BUNNY_STREAM_ACCESS_API_KEY"),
  StorageAccessKey: getEnv("BUNNY_STORAGE_ACCESS_KEY"),
};

// Helper Functions

// Get the Session Id
const getSessionUserId = async (): Promise<string> => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) throw new Error("Unauthenticated");

  return session.user.id;
};

// Server Actions
// Wrap with withErrorHandling function to avoid error for Video
export const getVideoUploadURL = withErrorHandling(async () => {
  // Current User from Session
  await getSessionUserId();

  // Api call to Bunny to upload the video
  const videoResponse = await apiFetch(
    `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos`,
    {
      method: "POST",
      bunnyType: "stream",
      body: {
        title: "Temporary File",
        collectionId: "",
      },
    }
  );

  // Uploaded Video URL
  const uploadUrl = `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoResponse.guid}`;

  // return
  return {
    videoID: videoResponse.guid,
    uploadUrl,
    accessKey: ACCESS_KEY.streamAccessKey,
  };
});

// Wrap with withErrorHandling function to avoid error for Thumbnail
export const getThumbnailUploadURL = withErrorHandling(async () => {
  // Current User from Session
  await getSessionUserId();
});
