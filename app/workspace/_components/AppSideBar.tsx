"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useContext, useState } from "react"
import { UserDetailsContext } from "@/context/UserDetailsContext"
import { Progress } from "@/components/ui/progress"
import { UserButton } from "@clerk/nextjs"
import { Settings, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { toast } from "sonner"
import { ProjectsList } from "./ProjectsList"

export function AppSidebar() {
  const [projectList, setProjectList] = useState([])
  const [loading, setLoading] = useState(false)
  const { userDetails, setUserDetails } = useContext(UserDetailsContext)
  const [input, setInput] = useState({
    name: "",
    description: "",
  })
  const generateRandomFrameNumber = () => {
    const number = Math.floor(Math.random() * 10000);
    return number;
  }
  const handleAddProject = () => {
    const projectId = uuidv4()
    const frameId = generateRandomFrameNumber()
    axios.post("/api/create-project", {
      projectId: projectId,
      frameId: frameId,
      messages: "",
      name: input.name,
      description: input.description
    })
      .then((response) => {
        toast.success("Project created successfully")
      })
      .catch((error) => {
        toast.error("Failed to create project")
      })
  }

  const getProjectsList = async () => {
    setLoading(true)
    try {
      const response = await axios.get("/api/get-projects-list")
      console.log(response.data)
      setProjectList(response.data)
    } catch (error) {
      console.error(error)
      toast.error("Failed to fetch projects")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getProjectsList()
  }, [])
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2"><img src="logo.svg" alt="logo" width={35} height={35} />
          <p className="text-xl font-bold">VibeCraft</p>
        </div>
        <Link href='/workspace' className="mt-5 w-full">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full">+ Add New Project</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle><p className="font-bold">Create New Project</p></AlertDialogTitle>
                <AlertDialogDescription>
                  <Input placeholder="Project Name" onChange={(e) => setInput({ ...input, name: e.target.value })} />
                  <Input placeholder="project description" className="mt-3" onChange={(e) => setInput({ ...input, description: e.target.value })} />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAddProject}>Create Project</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
          <SidebarGroupLabel><p className="font-bold">Projects</p></SidebarGroupLabel>
          {loading ? (
            <div className="flex justify-center items-center p-5">
              <Loader2 className="animate-spin text-black w-6 h-6" />
            </div>
          ) : (
            <>
              {projectList.length == 0 && (
                <h2 className="text-sm px-2 text-gray-500">No Projects Found</h2>
              )}
              <ProjectsList projects={projectList} />
            </>
          )}
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 border rounded-xl space-y-3 bg-secondary"><Link href="/">
          <p>Remaining Credits <span className="font-bold">{userDetails?.credits}</span></p>
          <Progress value={33} />
          <Button className="w-full mt-3">Upgrade To Unlimited!!</Button>
        </Link>
          <div className="mt-2 flex justify-between items-center">
            <UserButton />
            <Button variant={'ghost'}><Settings /><p className="ml-2 font-bold">Settings</p></Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}