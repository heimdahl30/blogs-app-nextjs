import { notFound } from "next/navigation";
import {getBlogById} from '../../services/blogs'
import { likeBlog } from "@/app/actions/blogs"

const SingleBlog = async ({params}:{params: Promise<{id: string}>}) => {
const {id} = await params
const blog = getBlogById(Number(id))

if (!blog) {
return notFound()
}

return (
    <div>
         <p>title: {blog.title},{" "}author: {blog.author},{" "}url: {blog.url},{" "}likes: {blog.likes}</p>
        <form action={likeBlog}>
            <input type='hidden' name='id' value={id} />
            <button type='submit'>like</button>
        </form>
    </div>
)
}

export default SingleBlog