"use client";

import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export default function ThemeToggle() {
    const {setTheme, theme} = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return false;

    return (
        <div
            className="cursor-pointer p-1.5 rounded-full bg-muted-foreground hover:bg-muted-foreground/80 hover:text-foreground/90 transition-colors text-background ring ring-muted"
            onClick={() =>
                setTheme((theme) => (theme === "dark" ? "light" : "dark"))
            }>
            {theme === "dark" ? (
                <Moon className="size-5" />
            ) : (
                <Sun className="size-5" />
            )}
        </div>
    );
}
