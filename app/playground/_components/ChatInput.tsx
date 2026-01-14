import React from 'react'
import { Button } from '@/components/ui/button'
import { Send, Paperclip } from 'lucide-react';

interface ChatInputProps {
    input: string;
    setInput: (value: string) => void;
    handleSend: () => void;
    isTyping: boolean;
}

export const ChatInput = ({ input, setInput, handleSend, isTyping }: ChatInputProps) => {
    return (
        <div className="p-4 bg-black border-t border-zinc-800 shrink-0">
            <div className="relative group bg-zinc-900 rounded-3xl border border-zinc-800 focus-within:border-zinc-700 focus-within:ring-4 focus-within:ring-zinc-900/50 transition-all duration-200">
                <textarea
                    placeholder="Ask anything..."
                    className="w-full bg-transparent border-none focus:ring-0 text-sm p-4 pr-12 resize-none min-h-[52px] max-h-[200px] outline-none text-zinc-100 placeholder:text-zinc-500"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />
                <div className="absolute left-2 bottom-2 flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
                    >
                        <Paperclip size={16} />
                    </Button>
                </div>
                <div className="absolute right-2 bottom-2">
                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        size="icon"
                        className={`h-9 w-9 rounded-full transition-all duration-200 ${input.trim()
                            ? 'bg-white text-black hover:scale-105 active:scale-95 shadow-md shadow-white/10'
                            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            }`}
                    >
                        <Send size={16} />
                    </Button>
                </div>
            </div>
            <div className="mt-3 flex items-center justify-center px-1">
                <span className="text-[10px] text-zinc-600 font-medium uppercase tracking-widest">Powered by VibeCraft AI</span>
            </div>
        </div>
    )
}
