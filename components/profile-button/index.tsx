import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const ProfileButton = () => {
  return (
    <Link href="/profile">
      <Button>Profile</Button>
    </Link>
  )
}
