'use client'
import React from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
//import { AUTH_API_BASE, LOGIN_PAGE_PATH } from "@shinami/nextjs-zklogin";

export default function HeaderMarketing() {
    const router = useRouter()

    return (
        <header className='flex flex-1 justify-between px-5 py-2 shadow-xl items-center w-screen'>
            <div className='flex flex-1 items-center'>
                <Image className="h-8 w-8 mr-2" src="/images/meitrustlogo.png" width={500} height={500} alt="MM" />
                <span className='text-normal font-semibold leading-relaxed text-sky-500'>MEI</span>
                <span className=' text-normal font-semibold leading-relaxed text-purple-700'>TRUST</span> 
            </div>
            <div>
            <button className='bg-sky-500 py-1 px-4 rounded-lg hover:bg-sky-800' onClick={() => router.push('/login')}>
                <span className='text-white text-sm font-semibold leading-relaxed'>Get Started</span>
            </button>
            </div>
        </header>
    )
}
