import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/AppSideBar"
import { AppHeader } from "./_components/AppHeader"
function WorkspaceLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
         <AppSidebar/>
         <div className="w-full">
            <AppHeader/>
            {children}
         </div>
        </SidebarProvider>
    )
}

export default WorkspaceLayout
