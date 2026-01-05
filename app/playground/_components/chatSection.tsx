import React from 'react'
import { Message } from '../[projectId]/page'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { setUncaughtExceptionCaptureCallback } from 'process'
type Props = {
    messages:Message[]
    onSend:any
}
export const ChatSection = ({messages,onSend}: Props) => {
    const [input,setInput] = React.useState('')
    const handleSend = async()=>{
        if (!input.trim)return;
        onSend(input)
        setInput('')
    }
    return (
        <div className='w-96 border-r h-full flex flex-col'>
           {/* message section */}
            <div className='flex-1 overflow-y-auto p-4 space-y-3 flex flex-col-1'>
                {messages.length===0?
                (
                    <div className='flex items-center justify-center h-full'>
                        <span className='text-sm text-gray-500'>
                            No messages
                        </span>
                    </div>
                ):(
                    messages.map((message,index)=>{
                        return(
                            <div key={index} 
                            className={`flex items-start ${message.role==='user'?'justify-end':'justify-start'}`}>
                              <div className={`p-2 rounded-lg ${message.role==='user'?'bg-gray-100 text-black':'bg-gray-300 text-black'}`}>
                                {message.content}
                              </div>
                            </div>
                        )
                    })
                )}
            </div>
           {/* footer input section */}
           <div className='p-3 border-t flex items-center gap-2'>
                <textarea value={input} placeholder='enter your prompts' onChange={(e)=>{setInput(e.target.value)}} className='flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 '/>
                <Button onClick={handleSend}><ArrowUp/></Button>
           </div>
        </div>
    )
}
