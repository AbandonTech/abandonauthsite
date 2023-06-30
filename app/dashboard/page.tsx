import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import LogoutButton from '@/components/logoutButton'
import DeveloperAppCard from '@/components/developerAppCard'
import AccountInfo from '@/components/accountInfo'

export default function() {
  const authorization = cookies().get('Authorization')

  if (!authorization) {
    return redirect('/')
  }

  return <div>
    <div className='flex items-center flex-col space-y-6'>
      <AccountInfo />
      <DeveloperAppCard />
    </div>

    <LogoutButton />
  </div>
}