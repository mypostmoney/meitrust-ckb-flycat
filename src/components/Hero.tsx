import React from 'react';
import { useRouter } from 'next/navigation';
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {

    const router = useRouter()
    return (
        <div className="flex flex-col flex-1 items-center w-screen mt-40">
            <div className="text-3xl text-sky-500 font-bold tracking-tight leading-none"><span className='px-2'>#1</span> Social Assets Network</div>
            {/* <div className="text-3xl text-sky-500 font-bold tracking-tight leading-none mt-8">200 million creators</div> */}
            <div className='flex flex-col items-center gap-y-3 mt-10'>
                <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Secure',
                        2000, 
                        'Protect',
                        2000, 
                        'Monetize',
                        2000,
                        'Own',
                        2000
                    ]}
                    wrapper="div"
                    speed={60}
                    style={{ fontSize: '1.875rem', lineHeight: '2.25rem', fontWeight: '700', letterSpacing: '-0.025e'}}
                    repeat={Infinity}
                />
            </div>

            <button className='bg-sky-500 py-1 px-4 rounded-lg hover:bg-sky-800 mt-10' onClick={() => router.push('/login')}>
                <span className='text-white text-sm font-semibold leading-relaxed'>Get Started</span>
            </button>
        </div>
    )
}