'use client'

import { createBlog } from "@/app/actions/blogs"
import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BlogFormState } from "@/app/actions/blogs"
import { useNotification } from "../../components/NotificationContext"

const initialState: BlogFormState = {
  errors: {},
  success: false,
  values: { title: "", author: "", url: "" }
}

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)
    const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="flex flex-col items-center min-h-screen mt-10">
      <h2 className="text-2xl font-bold mb-0.5 pl-2">Create a new blog</h2>
      <form action = {formAction} className="flex flex-col gap-4 mt-4 w-full max-w-sm">
        <div className="flex gap-2 justify-center">
          <label>
            Title
            <input type="text" name="title" defaultValue={state?.values?.title} required className="border rounded px-3 py-2 ml-8"/>
          </label>
          {state?.errors?.title && <p style={{ color: "red" }}>{state?.errors?.title}</p>}
        </div>
        <div className="flex gap-2 justify-center">
          <label>
            Author
            <input type="text" name="author" defaultValue={state?.values?.author} required className="border rounded px-3 py-2 ml-4"/>
          </label>
          {state?.errors?.author && <p style={{ color: "red" }}>{state?.errors?.author}</p>}
        </div>
          <div className="flex gap-2 justify-center">
          <label>
            URL
            <input type="text" name="url" defaultValue={state?.values?.url} required className="border rounded px-3 py-2 ml-8"/>
          </label>
          {state?.errors?.url && <p style={{ color: "red" }}>{state?.errors?.url}</p>}
        </div>
        <button data-testid="create-blog-button" type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Create
        </button>
      </form>
    </div>
  )
}

export default NewBlog