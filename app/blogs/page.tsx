import getBlogs from '../services/blogs';
import Form from 'next/form'

const Blogs = async ({searchParams}: {searchParams: Promise<{search?:string}>}) => {
  const {search} = await searchParams
  console.log("search",search)
    if(search) {
      const soughtblogs = await getBlogs(search)
      console.log("sb", soughtblogs)
      return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Sought Blogs</h2>
      <ul className="space-y-2">
        {[...soughtblogs].sort((a,b) => b.likes - a.likes).map(blog => (
          <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
            <p>id: {blog.id},{" "}title: {blog.title},{" "}author: {blog.author},{" "}url: {blog.url},{" "}likes: {blog.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
  const blogs = await getBlogs("")
  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col items-center">
      <Form action="/blogs" className="mb-6 flex gap-2 justify-center">
      <input type="text" name="search" placeholder="Search blogs..." className="border rounded px-3 py-2"/>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        Search
      </button>
      </Form>
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <ul className="space-y-2">
        {[...blogs].sort((a,b) => b.likes - a.likes).map(blog => (
          <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
            <p>id: {blog.id},{" "}title: {blog.title},{" "}author: {blog.author},{" "}url: {blog.url},{" "}likes: {blog.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs

