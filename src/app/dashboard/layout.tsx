import {getAllPlayground} from "@/features/dashboard/actions";
import DashboardSidebar from "@/features/dashboard/components/dashboard-sidebar";
import {SidebarProvider} from "@/src/components/ui/sidebar";
import {ReactNode} from "react";

const technologyIconMap: Record<string, string> = {
    REACT: "Zap",
    NEXTJS: "Lightbulb",
    EXPRESS: "Database",
    VUE: "Compass",
    HONO: "Flame",
    ANGULAR: "Terminal",
};

export default async function DashBoardLayout({
    children,
}: {
    children: ReactNode;
}) {
    const playgroundData = await getAllPlayground();

    const formattedPlaygroundData =
        playgroundData?.map((item) => ({
            id: item.id,
            name: item.title,
            starred: item.Starmark?.[0]?.isMarked || false,
            icon: technologyIconMap[item.template] || "Code2",
        })) || [];

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full overflow-hidden">
                <DashboardSidebar
                    initialPlaygroundData={formattedPlaygroundData}
                />
                <main className="flex-1">{children}</main>
            </div>
        </SidebarProvider>
    );
}
