'use client'

import { registerUser } from "../actions/users"
import { useActionState } from "react"
import { RegisterFormState } from "@/app/actions/users"

const initialState: RegisterFormState = {
  errors: {},
  values: { username: "", name: "", password: "", confirmPassword: "" }
}

export default function RegisterPage() {
  const [state, formaction] = useActionState(registerUser, initialState)

  return (
    <div className="flex flex-col items-center min-h-screen mt-10">
      <h2 className="text-2xl font-bold mb-0.5 pl-2">Register</h2>
      <form action={formaction} className="flex flex-col gap-4 mt-4 w-full max-w-sm">
        <div className="flex gap-2 justify-center">
          <label>
            Username
            <input type="text" name="username" defaultValue={state?.values?.username} required className="border rounded px-3 py-2 ml-4"/>
          </label>
          {state?.errors?.username && <p style={{ color: "red" }}>{state?.errors?.username}</p>}
        </div>
       <div className="flex gap-2 justify-center">
          <label>
            Name
            <input type="text" name="name" defaultValue={state?.values?.name} required className="border rounded px-3 py-2 ml-12"/>
          </label>
          {state?.errors?.name && <p style={{ color: "red" }}>{state?.errors?.name}</p>}
        </div>
        <div className="flex gap-2 justify-center">
          <label>
            Password
            <input type="password" name="password" defaultValue={state?.values?.password} required className="border rounded px-3 py-2 ml-5"/>
          </label>
          {state?.errors?.password && <p style={{ color: "red" }}>{state?.errors?.password}</p>}
        </div>
           <div className="flex gap-2 justify-center">
          <label className="flex flex-row items-center gap-2">
            <div>
            <p>Confirm</p><p> Password</p>
            </div>
            <input type="password" name="confirmPassword" defaultValue={state?.values?.confirmPassword} required className="border rounded px-3 py-2 ml-3"/>
          </label>
          {state?.errors?.confirmPassword && <p style={{ color: "red" }}>{state?.errors?.confirmPassword}</p>}
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Register
        </button>
      </form>
    </div>
  )
}