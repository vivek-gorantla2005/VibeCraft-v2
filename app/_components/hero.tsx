'use client'

import React, { useState } from 'react'
import { Image as ImageIcon, ArrowUp, Layout, ShoppingBag, Newspaper, Rocket, Loader2 } from 'lucide-react'
import { SignInButton, useUser } from '@clerk/nextjs'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
const SUGGESTIONS = [
    {
        label: 'SaaS Landing Page',
        icon: Rocket,
        prompt: "Create a modern SaaS landing page for a productivity tool with a dark theme, pricing cards, and a hero section with a 3D illustration."
    },
    {
        label: 'Designer Portfolio',
        icon: Layout,
        prompt: "Build a minimal designer portfolio with a masonry grid for projects, a floating navigation bar, and smooth scroll animations."
    },
    {
        label: 'E-commerce Store',
        icon: ShoppingBag,
        prompt: "Design a luxury e-commerce store for watches with high-quality imagery, a clean product filtering system, and an elegant serif typeface."
    },
    {
        label: 'Tech Blog',
        icon: Newspaper,
        prompt: "Create a clean tech blog with a focus on typography, a reading progress bar, a newsletter signup section, and a dark mode toggle."
    },
]

export const Hero = () => {
    const [inputValue, setInputValue] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useUser();

    const router = useRouter();

    const generateRandomFrameNumber = () => {
        const number = Math.floor(Math.random() * 10000);
        return number;
    }

    function generateProjectName() {
        const adjectives = [
            "Nova", "Vibe", "Zen", "Echo", "Quantum",
            "Neon", "Rapid", "Cosmic", "Pulse", "Astro"
        ];

        const nouns = [
            "Craft", "Forge", "Stack", "Flow", "Labs",
            "AI", "Build", "Hub", "Core", "Engine"
        ];

        const suffixes = ["", "X", "Pro", "ly", "ify"];

        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

        return `${adj}${noun}${suffix}`;
    }

    const CreateNewProject = async () => {
        if (!inputValue) return toast.error("Please enter a prompt first");
        setLoading(true);
        const projectId = uuidv4();
        const frameId = generateRandomFrameNumber();
        const messages = [{ role: "user", content: inputValue }];
        const projectName = generateProjectName();
        try {
            const result = await axios.post("/api/create-project", {
                projectId: projectId,
                name: projectName,
                description:"",
                frameId: frameId,
                messages: messages,
            })
            console.log(result.data);
            toast.success("Project created successfully")
            router.push(`/playground/${projectId}?frameId=${frameId}`)
        } catch (err) {
            console.log(err);
            toast.error("internal server error")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col gap-6 justify-center items-center h-[85vh]'>
            {/* header and description */}
            <div className='flex flex-col gap-3 max-w-3xl'>
                <h1 className='font-black text-6xl text-center leading-tight tracking-tight'>
                    Build websites that <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">match your vibe</span>
                </h1>
                <p className='text-xl font-medium text-center text-gray-500'>
                    The most intuitive way to build stunning websites. Explain your vision, and watch VibeCraft bring it to life instantly.
                </p>
            </div>

            {/* inputbox */}
            <div className="w-full max-w-4xl mt-4 relative group">
                <textarea
                    placeholder="Describe the website you want to build..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full h-44 p-6 pb-16 rounded-[2rem] border border-gray-200 bg-white text-gray-900 resize-none focus:outline-none focus:ring-4 focus:ring-gray-100/50 focus:border-gray-400 transition-all placeholder-gray-400 shadow-2xl shadow-gray-200/50"
                />
                <div className='absolute bottom-5 left-5'>
                    <button className='p-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-2xl transition-all cursor-pointer border border-gray-100 flex items-center justify-center'>
                        <ImageIcon size={22} />
                    </button>
                </div>
                <div className='absolute bottom-5 right-5'>
                    <button
                        onClick={CreateNewProject}
                        disabled={loading}
                        className='p-3 bg-black hover:bg-gray-800 text-white rounded-2xl transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center font-bold disabled:opacity-50 disabled:cursor-not-allowed min-w-[46px] min-h-[46px]'
                    >
                        {loading ? (
                            <Loader2 size={22} className="animate-spin" />
                        ) : (
                            <SignInButton mode='modal' forceRedirectUrl="/workspace">
                                <ArrowUp size={22} strokeWidth={3} />
                            </SignInButton>
                        )}
                    </button>
                </div>
            </div>

            {/* suggestion list */}
            <div className='flex flex-wrap gap-3 justify-center max-w-3xl'>
                {SUGGESTIONS.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setInputValue(item.prompt)}
                        className='flex items-center gap-2.5 px-5 py-2.5 bg-black border border-gray-100 rounded-full text-sm font-semibold text-white hover:border-gray-900 hover:bg-gray-50 hover:text-black transition-all cursor-pointer shadow-sm active:scale-95'
                    >
                        <item.icon size={16} className="text-gray-400" />
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
