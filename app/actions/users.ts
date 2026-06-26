"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { db } from "../../db"
import { users } from "../../db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/auth"

export interface RegisterFormState {
  errors?: Record<string, string>;
  values?: {
    username: string
    name: string
    password: string
    confirmPassword: string
  }
}

export const registerUser = async ( prevState: RegisterFormState,formData: FormData) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  const errors: Record<string, string> = {}

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username)
  })

if (existingUser) {
  errors.username = "Username already exists"
}
  if (!username || username.length < 4) errors.username = "Username is required and must be at least 5 characters long"
  if (!name || name.length < 4) errors.name = "Name is required and must be at least 5 characters long"
  if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match"

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { username, name, password, confirmPassword }
    }
  }
  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}

export const createToken = async () => {
  const token = crypto.randomUUID()
  const session = await auth()

  if (!session?.user?.email) {
    throw new Error("Unauthorized access")
  }

  const user = await db.query.users.findFirst({
    where: eq(users.username, session.user.email)
  })

  if (!user) {
    throw new Error("User record not found")
  }

  await db.update(users).set({ token }).where(eq(users.id, user.id))
    revalidatePath("/me")

  return token
}