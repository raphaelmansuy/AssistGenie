import { useSession } from 'next-auth/react'

type SessionWrapperProps = {
  children: React.ReactNode
}

export default function SessionWrapper({ children }: SessionWrapperProps) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>You need to be signed in to access this page</p>
      </div>
    )
  }

  return <>{children}</>
}
