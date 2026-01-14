'use client';

import React from 'react';
import { Globe, Terminal } from 'lucide-react';

interface PreviewProps {
    url: string | null;
    loading: boolean;
    status: string;
}

export const Preview = ({ url, loading, status }: PreviewProps) => {
    return (
        <div className="p-8 h-full flex flex-col gap-8 bg-black">
            <div className="flex-1 min-h-0 relative group">
                {url ? (
                    <div className="h-full rounded-[32px] overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 flex flex-col transition-all group-hover:border-zinc-700">
                        <div className="bg-zinc-950 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-zinc-800" />
                                    <div className="w-3 h-3 rounded-full bg-zinc-800" />
                                    <div className="w-3 h-3 rounded-full bg-zinc-800" />
                                </div>
                                <div className="h-4 w-px bg-zinc-800 mx-2" />
                                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full">
                                    <Globe size={12} className="text-zinc-500" />
                                    <span className="text-[10px] text-zinc-300 font-mono tracking-tight">{url}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">Preview Mode</span>
                            </div>
                        </div>
                        <p className='font-bold text-zinc-200'>Visit the site <a href={url} target="_blank">{url}</a></p>
                        {/* <iframe
                            src={url}
                            className="w-full h-full bg-white"
                        /> */}
                    </div>
                ) : (
                    <div className="h-full border-2 border-dashed border-zinc-800 rounded-[32px] flex flex-col items-center justify-center bg-zinc-900/30 text-zinc-500 backdrop-blur-sm transition-all group-hover:bg-zinc-900/40 group-hover:border-zinc-700">
                        {loading ? (
                            <div className="flex flex-col items-center gap-10 w-full max-w-md">
                                <div className="relative">
                                    <div className="w-24 h-24 border-4 border-zinc-900 border-t-blue-500 rounded-full animate-spin shadow-[0_0_30px_rgba(59,130,246,0.2)]" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 shadow-inner">
                                            <Terminal size={28} className="text-blue-400 animate-pulse" />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full space-y-6">
                                    <div className="flex flex-col items-center gap-2">
                                        <h3 className="text-lg font-bold text-zinc-200 tracking-tight">Setting up Workspace</h3>
                                        <p className="text-xs text-zinc-500 font-medium uppercase tracking-[0.2em]">Deployment in progress</p>
                                    </div>

                                    <div className="space-y-3 bg-zinc-950/50 p-6 rounded-[24px] border border-zinc-800/50 backdrop-blur-md">
                                        {[
                                            { label: 'Fetching project files', active: status === 'Fetching project files...' },
                                            { label: 'Initializing sandbox environment', active: status === 'Initializing sandbox environment...' },
                                            { label: 'Uploading files to sandbox', active: status === 'Uploading files to sandbox...' },
                                            { label: 'Starting development server', active: status === 'Starting development server...' },
                                        ].map((step, i) => {
                                            const isDone = [
                                                'Initializing sandbox environment...',
                                                'Uploading files to sandbox...',
                                                'Starting development server...',
                                                'Server running!'
                                            ].indexOf(status) > i || status === 'Server running!';

                                            return (
                                                <div key={i} className={`flex items-center gap-4 transition-all duration-500 ${step.active ? 'opacity-100' : isDone ? 'opacity-100' : 'opacity-30'}`}>
                                                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${step.active ? 'bg-blue-500 animate-pulse ring-4 ring-blue-500/20' :
                                                            isDone ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' :
                                                                'bg-zinc-800'
                                                        }`} />
                                                    <span className={`text-[12px] font-medium tracking-tight transition-colors duration-500 ${step.active ? 'text-zinc-100' :
                                                            isDone ? 'text-zinc-400' :
                                                                'text-zinc-600'
                                                        }`}>
                                                        {step.label}
                                                    </span>
                                                    {isDone && (
                                                        <span className="ml-auto text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Done</span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="bg-zinc-900/50 py-2 px-4 rounded-full border border-zinc-800/30 w-fit mx-auto">
                                        <p className="text-[10px] text-zinc-500 font-mono italic">
                                            Status: <span className="text-zinc-300">{status}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : status.toLowerCase().includes('failed') || status.toLowerCase().includes('error') || status.toLowerCase().includes('crash') ? (
                            <div className="flex flex-col items-center gap-6 max-w-md text-center p-6">
                                <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-2xl">
                                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center animate-pulse">
                                        <Terminal size={24} className="text-red-500" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-red-400 font-bold tracking-tight text-lg">Execution Halted</h3>
                                    <div className="bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 font-mono text-[11px] text-zinc-400 text-left overflow-auto max-h-[200px] w-full">
                                        <span className="text-red-500 mr-2">➜</span> {status}
                                    </div>
                                    <p className="text-[10px] text-zinc-500 font-medium px-8 italic">
                                        Check the console for more details or try restarting the process.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-6 max-w-sm text-center">
                                <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                                    <Globe size={32} className="text-zinc-700" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-zinc-300 font-bold tracking-tight">System Ready to Launch</h3>
                                    <p className="text-xs text-zinc-600 leading-relaxed px-8 font-medium italic">Use the "Run App" button in the header to start the development environment.</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
