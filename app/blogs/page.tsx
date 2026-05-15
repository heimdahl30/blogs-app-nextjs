import getBlogs from '../services/blogs';
import Form from 'next/form'

const Blogs = async ({searchParams}: {searchParams: Promise<{search?:string}>}) => {
    const blogs = getBlogs();
    const {search} = await searchParams
    if (search) {
      const soughtblogs = blogs.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()))
      return (
    <div>
      <h2>Sought Blogs</h2>
      <ul>
        {[...soughtblogs].sort((a,b) => b.likes - a.likes).map(blog => (
          <li key={blog.id}>
            <p>id: {blog.id},{" "}title: {blog.title},{" "}author: {blog.author},{" "}url: {blog.url},{" "}likes: {blog.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
  return (
    <div>
      <Form action="/blogs" style={{marginTop: '20px'}}>
      <input type="text" name="search" placeholder="Search blogs..." />
      <button type="submit">Search</button>
      </Form>
      <h2>Blogs</h2>
      <ul>
        {[...blogs].sort((a,b) => b.likes - a.likes).map(blog => (
          <li key={blog.id}>
            <p>id: {blog.id},{" "}title: {blog.title},{" "}author: {blog.author},{" "}url: {blog.url},{" "}likes: {blog.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs

