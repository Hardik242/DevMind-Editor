"use client";
import Footer from "@/features/home/components/footer";
import Header from "@/features/home/components/header";
import {ReactNode, useEffect, useRef} from "react";

export default function HomeLayout({children}: {children: ReactNode}) {
    // A ref to directly access the spotlight's DOM element without causing re-renders.
    const spotlightRef = useRef(null);

    // This effect runs once when the component mounts to add the mouse move listener.
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (spotlightRef.current) {
                const {clientX, clientY} = event;
                // Update the radial gradient's position directly on the DOM element.
                // This is more performant than using React state for high-frequency events.
                spotlightRef.current.setAttribute("cx", clientX);
                spotlightRef.current.setAttribute("cy", clientY);
            }
        };

        // Add the event listener to the window.
        window.addEventListener("mousemove", handleMouseMove);

        // Cleanup function to remove the event listener when the component unmounts.
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []); // Empty dependency array ensures this effect runs only once.

    return (
        <div className="z-20 h-full">
            <div className="w-full overflow-x-hidden">
                <svg
                    className="fixed z-0 top-0 right-0 left-0 bottom-0 h-screen w-screen"
                    aria-hidden="true">
                    <defs>
                        {/* Grid pattern definition */}
                        <pattern
                            id="grid"
                            width="50"
                            height="50"
                            patternUnits="userSpaceOnUse">
                            <path
                                d="M 50 0 L 0 0 0 50"
                                fill="none"
                                // Updated stroke color to your brand color with opacity
                                stroke="rgba(29, 161, 242, 0.15)"
                                strokeWidth="1"
                            />
                        </pattern>

                        {/* Base linear gradient using your brand color */}
                        <linearGradient
                            id="lineGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%">
                            <stop
                                offset="0%"
                                stopColor="rgba(29, 161, 242, 0.15)"
                            />
                            <stop
                                offset="25%"
                                stopColor="rgba(29, 161, 242, 0.06)"
                            />
                            <stop
                                offset="50%"
                                stopColor="rgba(29, 161, 242, 0.10)"
                            />
                            <stop
                                offset="75%"
                                stopColor="rgba(29, 161, 242, 0.06)"
                            />
                            <stop
                                offset="100%"
                                stopColor="rgba(29, 161, 242, 0.13)"
                            />
                        </linearGradient>

                        {/* Radial gradient for the cursor spotlight effect */}
                        <radialGradient id="spotlightGradient">
                            <stop
                                offset="0%"
                                stopColor="rgba(29, 161, 242, 0.15)"
                            />
                            <stop
                                offset="80%"
                                stopColor="rgba(29, 161, 242, 0.05)"
                            />
                            <stop
                                offset="100%"
                                stopColor="rgba(29, 161, 242, 0.0)"
                            />
                        </radialGradient>

                        {/* The ref is attached to the radialGradient element itself */}
                        <radialGradient
                            id="interactiveSpotlight"
                            ref={spotlightRef}
                            cx="500"
                            cy="500"
                            r="200"
                            gradientUnits="userSpaceOnUse">
                            <stop stopColor="rgba(29, 161, 242, 0.1)" />
                            <stop
                                offset="0.8"
                                stopColor="rgba(29, 161, 242, 0.01)"
                            />
                        </radialGradient>
                    </defs>

                    {/* Base layer with the linear gradient */}
                    <rect
                        width="100%"
                        height="100%"
                        fill="url(#lineGradient)"
                    />

                    {/* Grid pattern layer */}
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Spotlight effect layer that follows the cursor */}
                    <rect
                        width="100%"
                        height="100%"
                        fill="url(#interactiveSpotlight)"
                    />
                </svg>
            </div>

            <Header />

            <main className="relative z-20 w-full pt-0">{children}</main>

            <Footer />
        </div>
    );
}
