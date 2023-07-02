'use client'
import { useSession } from 'next-auth/react'

export default function Dashboard() {
  const { data: session } = useSession()

  // center the content
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      {session ? (
        <p className="text-lg">Welcome, {session.user.name}!</p>
      ) : (
        <p className="text-lg">Please sign in to access the dashboard.</p>
      )}
    </>
  )
}
