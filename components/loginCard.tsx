import Link from 'next/link';
import { FaDiscord, FaGithub } from 'react-icons/fa'

const DISCORD_REDIRECT = process.env.NEXT_PUBLIC_ABANDON_AUTH_DISCORD_REDIRECT
const GITHUB_REDIRECT = process.env.NEXT_PUBLIC_ABANDON_AUTH_GITHUB_REDIRECT

export default function LoginCard() {
    return <div className='flex flex-col w-72 gap-4 mt-16 lg:mt-20'>
            <Link
                href={DISCORD_REDIRECT!}
                className='flex bg-[#5865F2] h-16 p-4 rounded-xl items-center shadow hover:bg-[#4f5bda] hover:cursor-pointer dark:hover:bg-[#6974f3]'>
                <FaDiscord className='w-6 h-6 my-auto text-white' />
                <span className='mx-4 text-xl font-semibold text-center text-white'> Login with Discord </span>
            </Link>

            <Link
            href={GITHUB_REDIRECT!}
            className='flex bg-[#333] h-16 p-4 rounded-xl items-center shadow hover:bg-[#2F2F2F] hover:cursor-pointer dark:hover:bg-[#3C3C3C]'>
            <FaGithub className='w-6 h-6 my-auto text-white' />
            <span className='mx-4 text-xl font-semibold text-center text-white'> Login with GitHub </span>
            </Link>
        </div>
}