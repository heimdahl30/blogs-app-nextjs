import type Blog from '../../Types'
import { revalidatePath } from "next/cache";

let blogs: Blog[] = [
  { id: 1, title: 'Test blog 1', author: 'Test author 1', url: 'www.testblog1.com', likes: 0 },
  { id: 2, title: 'Test blog 2', author: 'Test author 2', url: 'www.testblog2.com', likes: 0 },
  { id: 3, title: 'Test blog 3', author: 'Test author 3', url: 'www.testblog3.com', likes: 0 },
]

let nextId = 4

const getBlogs = () => {
    return blogs as Blog[];
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 })
}

export const getBlogById = (id: number) => {
const blog = blogs.find(blog => blog.id === id)
return blog
}

export const blogLike = (id: number) => {
  blogs = blogs.map(blog =>
    blog.id === id ? { ...blog, likes: (blog.likes ?? 0) + 1 } : blog
  )
  revalidatePath(`/blogs/${id}`);
}

export const searchBlogBytext = (text) => {
  
}

export default getBlogs;