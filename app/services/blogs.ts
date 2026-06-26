import { revalidatePath } from "next/cache";
import {db} from '../../db';
import {blogs, readingList} from '../../db/schema'
import { eq,sql, ilike } from "drizzle-orm"
import { getCurrentUser } from "./session";

const getBlogs = async (search: string) => {
    if (search) {
    return db.query.blogs.findMany({
      where: ilike(sql`lower(${blogs.title})`, `%${search.toLowerCase()}%`),
    })
  }
    return db.query.blogs.findMany()
}

export const addBlog = async (title: string, author: string, url: string) => {
const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }
  const [blog] = await db.insert(blogs).values({title, author, url, userId: user!.id}).returning()

  if (!blog) {
    throw new Error("Failed to create blog")
  }

  await db.insert(readingList).values({blogId: blog.id, userId: user.id, read: false})
}

export const getBlogById = async (id: number) => {
 return db.query.blogs.findFirst({
  where: eq(blogs.id, id)
})
}

export const blogLike = async (id: number) => {
 const blog = await getBlogById(id)
 if(blog) {
  await db.update(blogs).set({likes: blog.likes + 1}).where(eq(blogs.id, id))
 }
  revalidatePath(`/blogs/${id}`);
}

export default getBlogs;