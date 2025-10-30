"use client";

import {Avatar, AvatarImage} from "@/src/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {cn} from "@/src/lib/utils";
import {LogOut} from "lucide-react";
import {useCurrentUser} from "../hooks/use-current-user";
import LogoutButton from "./logout-button";

export default function UserButton() {
    const user = useCurrentUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className={cn("relative rounded-full")}>
                    <Avatar>
                        <AvatarImage
                            src={user!.image as string}
                            alt={user?.name as string}
                        />
                    </Avatar>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mr-4">
                <DropdownMenuItem>
                    <span>{user?.email}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogoutButton>
                    <DropdownMenuItem variant="destructive">
                        <LogOut className="h-4 w-4 mr-2" />
                        LogOut
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
