import { LayoutDashboard, CreditCard, MessageSquare, Settings, Sparkles } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { UserButton } from "@clerk/nextjs"

const items = [
    {
        title: "Workspace",
        url: "/workspace",
        icon: LayoutDashboard,
    },
    {
        title: "Generate",
        url: "/workspace/generate",
        icon: Sparkles,
    },
    {
        title: "History",
        url: "/workspace/history",
        icon: MessageSquare,
    },
    {
        title: "Billing",
        url: "/workspace/billing",
        icon: CreditCard,
    },
    {
        title: "Settings",
        url: "/workspace/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" className="border-r border-gray-100">
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-3">
                    <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                    <span className="font-black text-xl tracking-tight group-data-[collapsible=icon]:hidden">
                        VibeCraft
                    </span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <a href={item.url} className="flex items-center gap-3 py-6">
                                            <item.icon className="h-5 w-5" />
                                            <span className="font-medium">{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                    <UserButton afterSignOutUrl="/" />
                    <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                        <span className="text-sm font-bold">My Account</span>
                        <span className="text-xs text-gray-500 italic">Free Plan</span>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
