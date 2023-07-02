import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const RegisterButton = () => {
  return (
    <Link href="/register">
      <Button className="mr-4">Register</Button>
    </Link>
  )
}
