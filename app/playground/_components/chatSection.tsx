"use client";

import React, { useState, useRef, useEffect } from 'react';
import { User, Bot, Sparkles } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader'
import axios from 'axios';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export const ChatSection = () => {
    const { projectId } = useParams();
    const searchParams = useSearchParams();
    const frameId = searchParams.get('frameId');

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hello! I'm your VibeCraft assistant. How can I help you build your project today?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            } else {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        const res = await axios.post("/api/send-message", {
            projectId,
            frameId,
            message: input,
        })
        console.log(res.data);
        setMessages(prev => [...prev, newMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate assistant response
        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I've updated the landing page with the new hero section and adjusted the color palette to match your brand. You can see the changes in the preview window.",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 2000);
    };

    return (
        <div className="w-[400px] border-r border-zinc-800 flex flex-col bg-black overflow-hidden h-full">
            {/* Header */}
            <ChatHeader />

            {/* Messages */}
            <div className="flex-1 min-h-0 relative">
                <ScrollArea className="h-full px-4 py-8" ref={scrollRef}>
                    <div className="flex flex-col gap-8 max-w-full pb-6">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-3 group animate-in fade-in slide-in-from-bottom-2 duration-300 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                                    }`}
                            >
                                <div
                                    className={`shrink-0 h-8 w-8 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${message.role === 'user'
                                        ? 'bg-zinc-100 text-black'
                                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                                        }`}
                                >
                                    {message.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                </div>
                                <div
                                    className={`flex flex-col gap-2 ${message.role === 'user' ? 'items-end' : 'items-start'
                                        } max-w-[85%]`}
                                >
                                    <div
                                        className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm transition-all ${message.role === 'user'
                                            ? 'bg-white text-black rounded-tr-none font-medium'
                                            : 'bg-zinc-900/50 text-zinc-100 border border-zinc-800/80 rounded-tl-none'
                                            }`}
                                    >
                                        {message.content}
                                    </div>
                                    <span className="text-[10px] text-zinc-500 font-bold tracking-wider px-1 uppercase">
                                        {message.timestamp.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="shrink-0 h-8 w-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg text-zinc-400">
                                    <Bot size={14} />
                                </div>
                                <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl rounded-tl-none px-4 py-4 shadow-sm">
                                    <div className="flex gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>

            {/* Input Area */}
            <ChatInput
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                isTyping={isTyping}
            />
        </div>
    );
};
