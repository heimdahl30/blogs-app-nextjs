import { NextRequest, NextResponse } from "next/server"
import { users } from "@/db/schema"
import { db } from "@/db"
import { eq } from "drizzle-orm"

export const GET = async (req: NextRequest) => {

    const bearerToken = req.headers.get("Authorization") || req.headers.get("authorization")
    console.log("Authorization header:", bearerToken)
    const token = bearerToken?.substring(7).trim()

    console.log("Received token:", token)

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await db.query.users.findFirst({
        where: eq(users.token, token),
        with: {blogs: true}
    })

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

  return NextResponse.json(user)
}