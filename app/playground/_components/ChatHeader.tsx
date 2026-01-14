import React from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles, User } from 'lucide-react'
export const ChatHeader = () => {
  return (
    <div className="h-14 border-b flex items-center px-4 justify-between bg-black shadow-sm shrink-0">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-xl  text-black shadow-md">
                        <Sparkles size={16} />
                    </div>
                    <div>
                        <h2 className="font-semibold text-sm text-white leading-none">VibeCraft AI</h2>
                        <div className="flex items-center gap-1.5 mt-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] text-zinc-500 font-medium">Active Now</span>
                        </div>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="text-white hover:text-zinc-600 rounded-full h-8 w-8">
                    <User size={18} />
                </Button>
            </div>
  )
}
