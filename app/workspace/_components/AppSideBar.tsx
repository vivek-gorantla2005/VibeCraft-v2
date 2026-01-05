"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useContext, useState } from "react"
import { UserDetailsContext } from "@/context/UserDetailsContext"
import { Progress } from "@/components/ui/progress"
import { UserButton } from "@clerk/nextjs"
import { Settings } from 'lucide-react';

export function AppSidebar() {
  const [projectList, setProjectList] = useState([])
  const { userDetails, setUserDetails } = useContext(UserDetailsContext)
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2"><img src="logo.svg" alt="logo" width={35} height={35} />
          <p className="text-xl font-bold">VibeCraft</p>
        </div>
        <Link href='/workspace' className="mt-5 w-full">
          <Button className="w-full">
            + Add New Project
          </Button>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          {
            projectList.length == 0 && <h2 className="text-sm px-2 text-gray-500">No Projects Found</h2>
          }
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 border rounded-xl space-y-3 bg-secondary"><Link href="/">
          <p>Remaining Credits <span className="font-bold">{userDetails?.credits}</span></p>
          <Progress value={33}/>
          <Button className="w-full mt-3">Upgrade To Unlimited!!</Button>
        </Link>
        <div className="mt-2 flex justify-between items-center">
          <UserButton/>
          <Button variant={'ghost'}><Settings /><p className="ml-2 font-bold">Settings</p></Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}