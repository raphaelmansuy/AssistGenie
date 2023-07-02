'use client'

import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import SessionWrapper from '@/components/session-wrapper'

export default function Logout() {
  const { data: session } = useSession()

  const handleLogout = () => {
    signOut({ redirect: false })
  }

  return (
    <SessionWrapper>
      <Button onClick={handleLogout}>{session ? 'Logout' : 'Login'}</Button>
    </SessionWrapper>
  )
}
