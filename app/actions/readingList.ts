"use server"

import { db } from '@/db';
import { readingList as readingListTable } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import {eq, and} from 'drizzle-orm'
import {getCurrentUser} from '../services/session'

export const addToReadingList = async (userId: number, blogId: number)  => {
  await db.insert(readingListTable)
    .values({ userId, blogId })
    .onConflictDoNothing(); // Prevents crashes if double-clicked

  revalidatePath(`/blogs/${blogId}`);
  revalidatePath('/me');
}

export const getReadingList = async (userId:number) => {
 return  await db.query.readingList.findMany({
    where: eq(readingListTable.userId, userId),
    columns: {
      id: true,
      read: true,
      userId: true,
      blogId: true,
    },
    with: {
      blog: {
        columns: {
          id: true,
          title: true,
          likes: true,
          url: true,
          author: true
        },
      }
    },
  })
}

export const toggleReadStatus = async (blogId: number | null) => {
  if (!blogId) return;

  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized access")
  }

  await db.update(readingListTable)
    .set({ read: true })
    .where(
       and(
        eq(readingListTable.blogId, blogId),
        eq(readingListTable.userId, user.id)
      )
    );

  revalidatePath(`/blogs/${blogId}`);
  revalidatePath('/me');
};


