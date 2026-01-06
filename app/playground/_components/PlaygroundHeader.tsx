import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react';
import { Globe } from 'lucide-react';
import { Code } from 'lucide-react';

export const PlaygroundHeader = () => {
    return (
        <div className='flex justify-between items-center p-3 px-6 border-b bg-white'>
            <div className='flex items-center gap-2 justify-center'>
                <Image src="/logo.svg" alt="logo" width={30} height={30} />
                <span className='font-bold text-lg'>VibeCraft</span>
                <span className='font-bold text-sm ml-10'>Real Estate SaaS</span>
            </div>
            <div className='flex items-center gap-4'>
                <Button size="sm"> <Code /> Code</Button>
                <Button variant="outline" size="sm"> <Globe /> Preview</Button>
                <Button size="sm">Export  <Github /></Button>
            </div>
        </div>
    )
}
