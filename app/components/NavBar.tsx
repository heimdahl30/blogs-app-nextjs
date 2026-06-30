"use client"
import { useSession, signOut } from "next-auth/react"
import NavLink from "./NavLink"

const Navbar = () => {
    const { data: session } = useSession()
    return (
         <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4">
        <NavLink href='/'>home</NavLink>
        {" | "}
        <NavLink href='/blogs'>blogs</NavLink>
        {" | "}
         <NavLink href='/users'>users</NavLink>

        <div className="ml-auto flex items-center gap-4">

        {session ? (
        <>
        <em data-testid="user-username">{session.user?.name} logged in</em>{" "}
        <NavLink href="/me">me</NavLink>
            {" | "}
          <NavLink href="/blogs/new">create new</NavLink>
          {" | "}
          <button onClick={() => signOut({ callbackUrl: "/" })} className="cursor-pointer hover:text-gray-300">logout</button>
        </>
      ) : (
        <>
         <NavLink href="/me">me</NavLink>
            {" | "}
        <NavLink href="/login">login</NavLink>
        {" | "}
        <NavLink href="/register">register</NavLink>
        </>
      )}
      </div>
        </nav>
    )
}

export default Navbar