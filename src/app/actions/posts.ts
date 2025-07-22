"use server";

import { prisma } from "@/lib/prisma";
import { authClient } from "@/lib/auth-client";

type CreatePostInput = {
  title: string;
  description?: string;
  cloudinaryUrl: string;
  publicId: string;
  thumbnailUrl?: string;
  game: string;
};

export async function createPost(input: CreatePostInput) {
  const { data: session } = await authClient.getSession();
  const user = session?.user;

  // If user is not admin, throw error
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const post = await prisma.post.create({
    data: {
      title: input.title,
      description: input.description,
      cloudinaryUrl: input.cloudinaryUrl,
      publicId: input.publicId,
      thumbnailUrl: input.thumbnailUrl,
      uploaderId: user.id,
      game: input.game,
    },
  });

  return post;
}
