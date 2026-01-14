import React from "react"
import Link from "next/link"
interface Project {
    name: string
    description: string
    projectId: string
    frameId: string
    createdOn: string
}

export const ProjectsList = ({ projects }: { projects: Project[] }) => {
    return (
        <div className="flex flex-col gap-1 text-sm">
            {projects.map((project) => (
                <button
                    key={project.projectId}
                    className="
            w-full text-left px-3 py-2 rounded-md
            hover:bg-neutral-100 dark:hover:bg-neutral-800
            transition-colors
          "
                >
                    <p className="font-medium truncate">
                        <Link href={`/playground/${project.projectId}?frameId=${project.frameId}`}>
                        {project.name || "Untitled Project"}
                        </Link>
                    </p>

                    <p className="text-xs text-neutral-500 truncate">
                        {project.description || "No description"}
                    </p>

                    <p className="text-[10px] text-neutral-400 mt-0.5">
                        {new Date(project.createdOn).toLocaleDateString()}
                    </p>
                </button>
            ))}
        </div>
    )
}
