"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Mahavir Patel",
    email: "mp@salesteam.com",
    avatar: "/avatars/sales-avatar.jpg",
  },
  navMain: [
    {
      title: "Sales Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Pipeline",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Sales Reports",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Accounts",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Sales Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Leads",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "New Leads",
          url: "#",
        },
        {
          title: "Qualified Leads",
          url: "#",
        },
      ],
    },
    {
      title: "Opportunities",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Deals",
          url: "#",
        },
        {
          title: "Closed Deals",
          url: "#",
        },
      ],
    },
    {
      title: "Quotes",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Pending Quotes",
          url: "#",
        },
        {
          title: "Approved Quotes",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Support",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "CRM Data",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Sales Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Proposal Templates",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Sales Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
