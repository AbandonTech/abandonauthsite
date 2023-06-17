import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import LogoutButton from '@/components/logoutButton'

export default function() {
  const authorization = cookies().get('Authorization')

  if (!authorization) {
    return redirect('/')
  }

  return <>
    <LogoutButton />
  </>
}