"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { apiFetch, withErrorHandling, getEnv } from "../utils";
import { BUNNY } from "@/constants";
import { db } from "@/drizzle/db";
import { videos } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";

// Keys and Links
const VIDEO_STREAM_BASE_URL = BUNNY.STREAM_BASE_URL;
const THUMBNAIL_STORAGE_BASE_URL = BUNNY.STORAGE_BASE_URL;
const THUMBNAIL_CDN_URL = BUNNY.CDN_URL;
const BUNNY_LIBRARY_ID = getEnv("BUNNY_LIBRARY_ID");
const ACCESS_KEY = {
  streamAccessKey: getEnv("BUNNY_STREAM_ACCESS_API_KEY"),
  StorageAccessKey: getEnv("BUNNY_STORAGE_ACCESS_KEY"),
};

// Revalidate Paths
const revalidatePaths = (paths: string[]) => {
  paths.forEach((path) => {
    revalidatePath(path);
  });
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

// Wrap with withErrorHandling function to avoid error for Thumbnail, accepts VideoId
export const getThumbnailUploadURL = withErrorHandling(
  async (videoId: string) => {
    // Current User from Session
    await getSessionUserId();

    const fileName = `${Date.now()}-${videoId}-thumbnail`;
    const uploadUrl = `${THUMBNAIL_STORAGE_BASE_URL}/thumbnails/${fileName}`;
    const cdnUrl = `${THUMBNAIL_CDN_URL}/thumbnails/${fileName}`;

    return {
      uploadUrl,
      cdnUrl,
      accessKey: ACCESS_KEY.StorageAccessKey,
    };
  }
);

// Save the Video URLs along with added metadata in our Database, Accepts videoDetails parameter that stores the form data
export const saveVideoDetails = withErrorHandling(
  async (videoDetails: VideoDetails) => {
    // Get the user
    const userId = await getSessionUserId();

    // Use Video Details to Update the Title and Other Metadata in Bunny CDN
    await apiFetch(
      `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoDetails.videoId}`,
      {
        method: "POST",
        bunnyType: "stream",
        body: {
          title: videoDetails.title,
          description: videoDetails.description,
        },
      }
    );

    // Insert in the Database, with videos schema
    await db.insert(videos).values({
      ...videoDetails,
      videoUrl: `${BUNNY.EMBED_URL}/${BUNNY_LIBRARY_ID}/${videoDetails.videoId}`,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // After the insert we've to revalidate the path to make sure the user sees the latest change i.e. see the uploaded video in the UI not the older cache

    // Revalidate the home page after we insert the video
    revalidatePaths(["/"]);

    // Return VideoId
    return {
      videoID: videoDetails.videoId,
    };
  }
);
