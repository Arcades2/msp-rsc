import { createPostInput } from "@/common/validation/post";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

const likeSelect = {
  id: true,
  user: {
    select: {
      id: true,
      image: true,
      name: true,
    },
  },
};

export const postRouter = createTRPCRouter({
  infiniteFollowedPosts: protectedProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { cursor } = input;
      const LIMIT = 5;

      const posts = await ctx.db.post.findMany({
        take: LIMIT + 1,
        where: {
          OR: [
            {
              user: {
                followedBy: {
                  some: {
                    id: ctx.session.user.id,
                  },
                },
              },
            },
            {
              user: {
                id: ctx.session.user.id,
              },
            },
          ],
        },
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          likes: {
            select: likeSelect,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      let nextCursor: typeof cursor;

      if (posts.length > LIMIT) {
        const nextPost = posts.pop();
        nextCursor = nextPost?.id;
      }

      return {
        posts,
        nextCursor,
      };
    }),
  createPost: protectedProcedure
    .input(createPostInput)
    .mutation(({ ctx, input }) =>
      ctx.db.post.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      }),
    ),
});
