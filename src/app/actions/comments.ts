"use server";

import { authClient } from "@/lib/auth-client";
import { prisma } from "@/lib/prisma";

type FetchCommentsInput = {
  videoId: string;
  limit?: number;
  cursor?: string | null; // could be comment id or createdAt
};

export async function fetchComments({
  videoId,
  limit = 10,
  cursor = null,
}: FetchCommentsInput) {
  const { data: session } = await authClient.getSession(); // null if not logged in
  const user = session?.user;

  // Fetch parent comments (no parentId), paginated
  const parentComments = await prisma.comment.findMany({
    where: {
      videoId,
      parentId: null,
    },
    orderBy: { createdAt: "desc" },
    take: limit + 1, // fetch one extra to check for next page
    ...(cursor
      ? {
          cursor: { id: cursor },
          skip: 1, // skip the cursor itself
        }
      : {}),
    include: {
      user: { select: { id: true, name: true, image: true } },
      likes: user
        ? {
            where: { userId: user.id },
            select: { id: true },
          }
        : false,
      subcomments: {
        orderBy: { createdAt: "asc" },
        include: {
          user: { select: { id: true, name: true, image: true } },
          likes: user
            ? {
                where: { userId: user.id },
                select: { id: true },
              }
            : false,
        },
      },
    },
  });

  let nextCursor: string | null = null;
  if (parentComments.length > limit) {
    nextCursor = parentComments[limit].id;
    parentComments.pop();
  }

  // Format the data for frontend
  const comments = parentComments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    imageUrl: comment.imageUrl,
    createdAt: comment.createdAt,
    user: comment.user,
    likeCount: comment.likes.length,
    likedByCurrentUser: user ? comment.likes.length > 0 : false,
    subcomments: comment.subcomments.map((sub) => ({
      id: sub.id,
      content: sub.content,
      imageUrl: sub.imageUrl,
      createdAt: sub.createdAt,
      user: sub.user,
      likeCount: sub.likes.length,
      likedByCurrentUser: user ? sub.likes.length > 0 : false,
    })),
  }));

  return { comments, nextCursor };
}
