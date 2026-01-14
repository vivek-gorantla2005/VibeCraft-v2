"use client"
import { useEffect,useState } from 'react'
import React from 'react'
const Page = () => {
    const [files,setFiles] = useState([])
    const getFiles = async ()=>{
        const response = await fetch("/api/previewFiles?projectId=c63dd0b1-7abf-4516-8c74-6decfafc9784")
        const data = await response.json()
        console.log(data);
        setFiles(data)
    }
    useEffect(() => {
        getFiles()
    }, [])
  return (
    <div>
        <h1>Files</h1>
        
    </div>
  )
}

export default Page
