import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export const PlaygroundHeader = () => {
    return (
        <div className='flex justify-between items-center p-3 px-6 border-b bg-white'>
            <div className='flex items-center gap-2'>
                <Image src="/logo.svg" alt="logo" width={30} height={30} />
                <span className='font-bold text-lg'>VibeCraft</span>
            </div>
            <div className='flex items-center gap-4'>
                <Button variant="outline" size="sm">Preview</Button>
                <Button size="sm">Save</Button>
            </div>
        </div>
    )
}
