import { db } from '../db/client';
import { posts } from '../db/schema';
import { eq } from 'drizzle-orm';
export const resolvers = {
  // Query: {
  //   users: async () => await db.select().from(usersTable),
  // },
  Query: {
    posts: async (_: unknown, __: unknown, context: any) => {
      console.log(context);
      return await db.select().from(posts);
    },
    post: async (_: unknown, { id }: { id: number }) => {
      const result = await db
        .select()
        .from(posts)
        .where(eq(posts.id, id))
        .limit(1);
      return result[0] || null;
    },
  },

  Mutation: {
    createPost: async (
      _: unknown,
      { input }: { input: { title: string; content?: string } }
    ) => {
      const [newPost] = await db
        .insert(posts)
        .values({
          title: input.title,
          content: input.content,
        })
        .returning();
      return newPost;
    },
  },
};
