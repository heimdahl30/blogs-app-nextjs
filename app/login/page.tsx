"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginPage = () => {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen mt-10">
      <h2 className="text-2xl font-bold mb-0.5 pl-2">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-full max-w-sm">
        <div className="flex gap-2 justify-center">
          <label>
            Username
            <input type="text" name="username" required className="border rounded px-3 py-2 ml-2"/>
          </label>
        </div>
        <div className="flex gap-2 justify-center">
          <label>
            Password
            <input type="password" name="password" required className="border rounded px-3 py-2 ml-3"/>
          </label>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage