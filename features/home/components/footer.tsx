import {Github as LucideGithub} from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const socialLinks = [
        {
            href: "#",
            icon: <LucideGithub className="w-5 h-5 text-foreground" />,
        },
    ];

    return (
        <footer className="border-t border-border dark:border-border bg-background/20 backdrop-blur-md relative z-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col items-center space-y-6 text-center">
                {/* Social Links */}
                <div className="flex gap-4">
                    {socialLinks.map((link, index) => (
                        <Link
                            className=" ring ring-muted-foreground p-1 rounded-full bg-muted hover:text-foreground/80 transition-colors"
                            key={index}
                            href={link.href || "#"}
                            target="_blank"
                            rel="noopener noreferrer">
                            {link.icon}
                        </Link>
                    ))}
                </div>

                {/* Copyright Notice */}
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Codesnippet. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
