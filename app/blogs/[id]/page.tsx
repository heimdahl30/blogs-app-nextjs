import { notFound } from "next/navigation";
import {getBlogById} from '../../services/blogs'
import { likeBlog } from "@/app/actions/blogs"
import { getCurrentUser } from "@/app/services/session";
import {eq, and} from "drizzle-orm";
import {db} from '../../../db';
import {readingList} from '../../../db/schema'
import { addToReadingList } from "@/app/actions/readingList";


const SingleBlog = async ({params}:{params: Promise<{id: string}>}) => {
const {id} = await params
const blog = await getBlogById(Number(id))
const currentUser = await getCurrentUser()

if (!blog) {
return notFound()
}

if (!currentUser?.id || !blog.id) {
  // Handle the logged-out state (e.g., throw an error or return early)
  throw new Error("User must be logged in and blogId must be provided");
}


const isAuthor = blog.userId === currentUser?.id;

const existingRecord = await db.query.readingList.findFirst({
  where: and(
    eq(readingList.userId, currentUser.id), // Use the imported table object
    eq(readingList.blogId, Number(id))
  ),
});

const showAddButton = !isAuthor && !existingRecord;

return (
    <div className="flex items-center justify-center min-h-screen">
    <div data-testid="blog-detail" className="max-w-2xl mx-auto p-2 border rounded p-3 hover:bg-gray-50 flex flex-col items-center gap-4">
         <p>
          <span data-testid="blog-title">title: {blog.title}</span>,{" "}
          <span data-testid="blog-author">author: {blog.author}</span>,{" "}
          <span>url: {blog.url}</span>,{" "}
          <span>likes: {blog.likes}</span>
          </p>
         <div>
        <form action={likeBlog} className="mb-2 flex gap-2 justify-center w-full">
            <input type='hidden' name='id' value={id} />
            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-full">like</button>
        </form>
        {showAddButton && (
        <form action={async () => {
          'use server';
          await addToReadingList(currentUser?.id as number, blog.id as number);
        }}>
          <button data-testid="add-to-reading-list-button" type="submit" className="mt-1 px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded cursor-pointer">
            Add to Reading List
          </button>
        </form>
      )}
        </div>
    </div>
    </div>
)
}

export default SingleBlog