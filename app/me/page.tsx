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
    redirect("/login"); // Immediate redirect without client-side lag
  }

  const fetchedReadingList = await getReadingList(currentUser.id);


    return (
        <div className="min-h-screen flex items-start justify-center gap-6">
        <div data-testid="user-profile" className="w-full max-w-2xl mx-auto p-6 flex flex-col items-start border border-gray-100 shadow-lg shadow-gray-200/50 rounded-xl">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            <p data-testid="user-name"><strong>Name:</strong> {currentUser.name}</p>
            <p data-testid="user-username"><strong>Username:</strong> {currentUser.username}</p>
            <div className="w-full h-0.5 bg-black rounded-full my-6"></div>
                <h1 data-testid="api-token-section" className="text-2xl font-bold mb-4">API Token</h1>
                <TokenGenerator initialToken={currentUser.token} />
                <div className="w-full h-0.5 bg-black rounded-full my-6"></div>
                <h1 data-testid="reading-list-section" className="text-2xl font-bold mb-4">Reading List</h1>
        {fetchedReadingList.length === 0 ? (
        <p data-testid="empty-reading-list">Your reading list is empty.</p>
      ) : (
        <>
        <h1 className="text-1xl font-bold mb-1">Unread ({fetchedReadingList.filter(item => item.read === false).length})</h1>
        {fetchedReadingList.filter(item => item.read === false).length === 0 ? (<p data-testid="no-unread-blogs">There are no unread blogs</p>) : (<ul data-testid="unread-section" className="w-full space-y-2">
          {fetchedReadingList.filter(item => item.read === false).map((item) => (
            <li key={item.id} className="flex items-center gap-4 p-1 bg-yellow-50 rounded">
              <Link href={`/blogs/${item.blogId}`} className="text-blue-600 hover:underline flex-1">
                {item.blog?.title}
              </Link>
                 <ToggleButton blogId={item.blogId} onClick={toggleReadStatus} />
            </li>
          ))}
        </ul>)}

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