import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
export const Header = () => {
    const menuoptions = [
        {
            name: "Pricing",
            path: "/pricing"
        },
        {
            name: "ContactUs",
            path: "/contact-us"
        }
    ]
    return (
        <div className='flex items-center justify-between p-4 shadow'>
            {/* logo */}
            <div className='flex items-center gap-2'>
                <Image src="/logo.svg" alt="Logo" width={30} height={30} priority />
                <h1 className='font-extrabold text-xl'>VibeCraft</h1>
            </div>
            {/* menu options */}
            <div className='flex gap-3'>
                {menuoptions.map((menu, index) => (
                    <Button variant={"ghost"} key={index}>{menu.name}</Button>
                ))}
            </div>

            {/* get started */}
            <div>
                <SignInButton mode='modal' forceRedirectUrl={"/workspace"}>
                    <Link href={"/workspace"}>
                        <Button><p className='font-bold'>Get Started </p><ArrowRight /></Button>
                    </Link>
                </SignInButton>
            </div>
        </div>
    )
}
