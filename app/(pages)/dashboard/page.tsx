'use client'
import { useSession } from 'next-auth/react'
import { SignoutButton } from '@/components/signout-button'
import { SigninButton } from '@/components/signin-button'

export default function Dashboard() {
  const { data: session } = useSession()

  // center the content
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      {session ? (
        <div className="m-4 flex flex-col">
          <p className="p-2 text-lg">Welcome, {session.user.name}!</p>
          <p className="p-2 text-lg">Your email is {session.user.email}.</p>
          <SignoutButton />
        </div>
      ) : (
        <div>
          <p className="text-lg">Please sign in to access the dashboard.</p>
          <SigninButton />
        </div>
      )}
    </>
  )
}
