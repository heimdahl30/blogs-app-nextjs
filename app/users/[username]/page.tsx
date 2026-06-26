import { getUserByUsername } from "@/app/services/users";
import { notFound } from "next/navigation";
import Link from 'next/link'

const SingleUser = async ({params}:{params: Promise<{username: string}>}) => {
    const {username: rawUsername} = await params;
    const username = decodeURIComponent(rawUsername);
    console.log('username', username)
    const user = await getUserByUsername(username);

    if (!user){
        return notFound();
    }

    return (
        <>
        <h2 className="text-2xl font-bold mb-0.5 pl-2">{user.name}</h2>
        <p className="text-lg mb-0.5 pl-2">Username: {user.username}</p>
        <ul className="list-disc pl-5">
            {user.blogs.map(blog => (
                <li key={blog.id}>
                 <p>title: <Link href={`/blogs/${blog.id}`} className="hover:underline">
                    {blog.title}
                 </Link>,{" "}
                 author: {blog.author},{" "}
                 url: {blog.url},{" "}
                 likes: {blog.likes}
                 </p>
                </li>
            ))}
        </ul>
        </>
    )

}

export default SingleUser