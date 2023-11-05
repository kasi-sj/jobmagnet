import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { auth } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs";

const f = createUploadthing();

// const getUser = async () => await currentUser();


export const ourFileRouter = {
  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 },pdf: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      return { userId: 1 };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;