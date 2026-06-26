import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import {db} from '../../../../db'
import {users} from '../../../../db/schema'
import bcrypt from "bcryptjs"

export const POST = async (req: NextRequest) => {

  if (process.env.NODE_ENV === "production") {
  return NextResponse.json(
    { error: "This endpoint is not available in production" },
    { status: 403 },
  )
}
try{

  const body = await req.json()
  const { username, name, password } = body

    if (!username || username.length < 4) {
        return NextResponse.json(
      { error: "Username must be at least 4 characters" },
      { status: 400 },
    )
    }

    if (!name || name.length < 4) {
        return NextResponse.json(
      { error: "Name must be at least 4 characters" },
      { status: 400 },
    )
    }

       if (!password || password.length < 6) { // Added password strength check
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const [user] = await db.insert(users).values({ username, name, passwordHash }).returning()
    revalidatePath('/users')
   const { id, username: savedUsername, name: savedName, token } = user;
    return NextResponse.json({ user: { id, username: savedUsername, name: savedName, token }}, { status: 201 });
}
catch (error) {
console.error("Database reset failed:", error);
return NextResponse.json({ error: "Failed to reset database" }, { status: 500 });
}
}