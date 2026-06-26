"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, blogLike} from "../services/blogs"
import { auth } from "@/auth"

export interface BlogFormState {
  errors?: Record<string, string>;
  success?: boolean
  values?: {
    title: string;
    author: string;
    url: string;
  };
}

export const createBlog = async (prevState: BlogFormState, formData: FormData) => {

  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  const errors: Record<string, string> = {}

  if (!title || title.length <5) errors.title = "Title required and must be 5 characters long"
  if (!author || author.length <5) errors.author = "Author required and must be 5 characters long"
  if (!url || url.length <5) errors.url = "URL required and must be 5 characters long"

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { title, author, url },
      success: false,
    }
  }
  await addBlog(title, author, url)

  revalidatePath("/blogs")
  return { errors: {}, success: true }
}

export const likeBlog = async (formData: FormData) => {
  const id = formData.get('id') as string
  await blogLike(Number(id))
}