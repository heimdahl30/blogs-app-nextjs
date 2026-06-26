import Link from "next/link";
import { redirect } from "next/navigation";
import { getReadingList } from "../actions/readingList";
import {getCurrentUser} from '../services/session'
import TokenGenerator from "./TokenGenerator";
import ToggleButton from "./ToggleButton";
import { toggleReadStatus } from "../actions/readingList";

const Me = async () => {

      const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/api/auth/signin"); // Immediate redirect without client-side lag
  }

  const fetchedReadingList = await getReadingList(currentUser.id);


    return (
        <div className="min-h-screen flex items-start justify-center gap-6">
        <div className="w-full max-w-2xl mx-auto p-6 flex flex-col items-start border border-gray-100 shadow-lg shadow-gray-200/50 rounded-xl">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            <p><strong>Name:</strong> {currentUser.name}</p>
            <p><strong>Username:</strong> {currentUser.username}</p>
            <div className="w-full h-0.5 bg-black rounded-full my-6"></div>
                <h1 className="text-2xl font-bold mb-4">API Token</h1>
                <TokenGenerator initialToken={currentUser.token} />
                <div className="w-full h-0.5 bg-black rounded-full my-6"></div>
                <h1 className="text-2xl font-bold mb-4">Reading List</h1>
        {fetchedReadingList.length === 0 ? (
        <p>Your reading list is empty.</p>
      ) : (
        <>
        <h1 className="text-1xl font-bold mb-1">Unread ({fetchedReadingList.filter(item => item.read === false).length})</h1>
        <ul className="w-full space-y-2">
          {fetchedReadingList.filter(item => item.read === false).map((item) => (
            <li key={item.id} className="flex items-center gap-4 p-1 bg-yellow-50 rounded">
              <Link href={`/blogs/${item.blogId}`} className="text-blue-600 hover:underline flex-1">
                {item.blog?.title}
              </Link>
                 <ToggleButton blogId={item.blogId} onClick={toggleReadStatus} />
            </li>
          ))}
        </ul>
        <h1 className="text-1xl font-bold mb-1 mt-4">Read ({fetchedReadingList.filter(item => item.read === true).length})</h1>
        <ul className="w-full space-y-2">
          {fetchedReadingList.filter(item => item.read === true).map((item) => (
            <li key={item.id} className="flex items-center gap-4 p-1 bg-green-50 rounded">
              <Link href={`/blogs/${item.blogId}`} className="text-blue-600 hover:underline flex-1">
                {item.blog?.title}
              </Link>
            </li>
          ))}
        </ul>
        </>
      )}
      </div>
        </div>
    )
}

export default Me