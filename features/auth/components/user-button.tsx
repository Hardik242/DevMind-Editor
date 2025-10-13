"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";
import {LogOut, User} from "lucide-react";
import {useCurrentUser} from "../hooks/use-current-user";
import LogoutButton from "./logout-button";

export default function UserButton() {
    const user = useCurrentUser();

    console.log(user);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className={cn("relative rounded-full")}>
                    <Avatar>
                        {/* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */}
                        <AvatarImage src={user?.image!} alt={user?.name!} />
                        <AvatarFallback className="bg-red-500">
                            <User className="text-white" />
                        </AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mr-4">
                <DropdownMenuItem>
                    <span>{user?.email}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogoutButton>
                    <DropdownMenuItem>
                        <LogOut className="h-4 w-4 mr-2" />
                        LogOut
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
