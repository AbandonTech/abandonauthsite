'use client'


import { useRouter } from 'next/navigation'

export default function logoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/user/logout')
    await router.push('/')
  }

  return <button
    onClick={handleLogout}
    className='w-24 px-4 py-2 font-semibold text-sm bg-blue-500 text-white rounded-full shadow-sm'>
    Logout
  </button>
}