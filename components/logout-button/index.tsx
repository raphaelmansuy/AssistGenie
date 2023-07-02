'use client'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export const LoginButton = () => {
  return <Button onClick={() => signOut()}>Sign out</Button>
}
