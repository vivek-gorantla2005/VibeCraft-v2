import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Github, Globe, Code, Loader2, Play, Share2 } from 'lucide-react';
interface PlaygroundHeaderProps {
    startDevServer: () => void;
    loading: boolean;
    url: string | null;
    status: string;
}

export const PlaygroundHeader = ({ startDevServer, loading, url, status }: PlaygroundHeaderProps) => {
    return (
        <div className='flex justify-between items-center p-3 px-6 border-b border-zinc-800 bg-black text-white'>
            <div className='flex items-center gap-3 justify-center'>
                <div className="bg-white p-1 rounded-lg">
                    <Image src="/logo.svg" alt="logo" width={24} height={24} />
                </div>
                <div className="flex flex-col">
                    <span className='font-bold text-sm tracking-tight'>VibeCraft</span>
                    <span className='text-[10px] text-zinc-500 font-medium uppercase tracking-wider'>Real Estate SaaS</span>
                </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-1.5 bg-zinc-900/50 rounded-full border border-zinc-800">
                <div className={`h-1.5 w-1.5 rounded-full ${status.includes('running') ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'}`} />
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{status}</span>
            </div>

            <div className='flex items-center gap-3'>
                <Button variant="ghost" size="sm" className="font-bold hover:text-white bg-white text-black hover:bg-zinc-900 gap-2">
                    <Code size={16} />
                    <span>Code</span>
                </Button>

                <Button
                    onClick={startDevServer}
                    disabled={loading || (!!url)}
                    variant={url ? "secondary" : "default"}
                    size="sm"
                    className={`gap-2 min-w-[120px] shadow-lg transition-all ${!url && !loading
                            ? 'bg-white text-black hover:bg-zinc-200'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                >
                    {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : url ? (
                        <Globe size={16} />
                    ) : (
                        <Play size={16} fill="currentColor" />
                    )}
                    <span>{loading ? 'Starting...' : url ? 'Live' : 'Run App'}</span>
                </Button>

                <div className="h-4 w-px bg-zinc-800 mx-1" />

                <Button variant="outline" size="sm" className="border-zinc-800 text-black hover:text-white hover:bg-zinc-900 gap-2">
                    <Github size={16} />
                    <span>Export</span>
                </Button>
            </div>
        </div>
    )
}
