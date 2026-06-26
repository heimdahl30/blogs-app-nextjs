import Link from 'next/link'
import {getUsers} from '../services/users'

const Users = async () => {
    const users = await getUsers()
    return (
        <div>
            <ul className="list-disc pl-5">
                {users.map((user) => (
                 <li key={user.id} className="p-0.1">
                    <Link href={`/users/${user.username}`} className="hover:underline">
                        {user.name}
                    </Link>
                 </li>
                ))}
            </ul>
        </div>
    )
}

export default Users