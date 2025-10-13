import {useRouter} from "next/navigation";
import {LogoutButtonProps} from "../types";
import {signOut} from "next-auth/react";

export default function LogoutButton({children}: LogoutButtonProps) {
    const router = useRouter();

    async function onlogout() {
        await signOut();
        router.refresh();
    }

    return (
        <span className="cursor-pointer" onClick={onlogout}>
            {children}
        </span>
    );
}
