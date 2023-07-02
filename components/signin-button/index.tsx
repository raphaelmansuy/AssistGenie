'use client'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export const SigninButton = () => {
  return <Button onClick={() => signIn()}>Sign in</Button>
}
