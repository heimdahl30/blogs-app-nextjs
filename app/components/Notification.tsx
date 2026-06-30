"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  /*
  const style: React.CSSProperties = {
    padding: "10px 16px",
    marginBottom: "10px",
    borderRadius: "4px",
    color: "white",
    backgroundColor: type === "success" ? "#16a34a" : "#dc2626",
  }
    */

  return <div data-testid="notification" className= {`px-2.5 py-4 mb-2.5 rounded text-white ${type === "success" ? "bg-green-600" : "bg-red-600"}`}>{message}</div>
}