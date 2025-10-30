"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/src/components/ui/sidebar";
import {
    FolderPlusIcon,
    HistoryIcon,
    HomeIcon,
    PlusIcon,
    SettingsIcon,
    StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {lucideIconsMap, PlaygroundDataProps} from "../types";

export default function DashboardSidebar({
    initialPlaygroundData,
}: {
    initialPlaygroundData: PlaygroundDataProps[];
}) {
    const pathname = usePathname();
    const [starredPlaygrounds, setStarredPlaygrounds] = useState(
        initialPlaygroundData.filter((p) => p.starred)
    );
    const [recentPlayground, setRecentPlayground] = useState(
        initialPlaygroundData
    );

    return (
        <Sidebar
            variant="inset"
            collapsible="icon"
            className="broder-1 border-r">
            <SidebarHeader>
                <div className="flex items-center gap-2 px-4 py-3 justify-center">
                    <Image
                        src={"/logo.png"}
                        height={50}
                        width={50}
                        alt="logo"
                    />
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === "/"}
                                tooltip={"Home"}>
                                <Link href={"/"}>
                                    <HomeIcon className="size-4" />
                                    <span>Home</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        <StarIcon className="size-4 mr-2" /> Starred
                    </SidebarGroupLabel>
                    <SidebarGroupAction title="Add Starred Playground">
                        <PlusIcon className="size-4" />
                    </SidebarGroupAction>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {starredPlaygrounds.length === 0 &&
                            recentPlayground.length === 0 ? (
                                <div className="text-muted-foreground text-center py-4 w-full">
                                    Create your playground
                                </div>
                            ) : (
                                starredPlaygrounds.map((playground) => {
                                    const IconComponent =
                                        lucideIconsMap[playground.icon] ||
                                        "Code";

                                    return (
                                        <SidebarMenuItem key={playground.id}>
                                            <SidebarMenuButton
                                                asChild
                                                tooltip={playground.name}
                                                isActive={
                                                    pathname ===
                                                    `/playground/${playground.id}`
                                                }>
                                                <Link
                                                    href={`/playground/${playground.id}`}>
                                                    <IconComponent className="size-4" />
                                                    <span>
                                                        {playground.name}
                                                    </span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        <HistoryIcon className="size-4 mr-2" /> Recent
                    </SidebarGroupLabel>
                    <SidebarGroupAction title="Create New Playground">
                        <FolderPlusIcon className="size-4" />
                    </SidebarGroupAction>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {starredPlaygrounds.length === 0 &&
                            recentPlayground.length === 0 ? (
                                <div className="text-muted-foreground text-center py-4 w-full">
                                    Create your playground
                                </div>
                            ) : (
                                recentPlayground.map((playground) => {
                                    const IconComponent =
                                        lucideIconsMap[playground.icon] ||
                                        "Code";

                                    return (
                                        <SidebarMenuItem key={playground.id}>
                                            <SidebarMenuButton
                                                asChild
                                                tooltip={playground.name}
                                                isActive={
                                                    pathname ===
                                                    `/playground/${playground.id}`
                                                }>
                                                <Link
                                                    href={`/playground/${playground.id}`}>
                                                    <IconComponent className="size-4" />
                                                    <span>
                                                        {playground.name}
                                                    </span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })
                            )}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    variant={"outline"}
                                    asChild
                                    tooltip={"View all"}>
                                    <Link href={"/playground"}>
                                        <span className="text-muted-foreground text-center py-4 w-full">
                                            View all playgrounds
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            variant={"outline"}
                            asChild
                            tooltip={"Settings"}>
                            <Link href={"/settings"}>
                                <SettingsIcon className="size-4" /> Settings
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
