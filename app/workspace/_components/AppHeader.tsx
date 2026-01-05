import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
export const AppHeader = () => {
  return (
    <div className='flex justify-between items-center p-4 shadow'>
      <SidebarTrigger/>
      <UserButton/>
    </div>
  )
}
