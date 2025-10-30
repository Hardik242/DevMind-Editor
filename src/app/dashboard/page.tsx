import {
    deleteProjectById,
    duplicateProjectById,
    editProjectById,
    getAllPlayground,
} from "@/features/dashboard/actions";
import AddNewButton from "@/features/dashboard/components/add-new-button";
import AddRepoButton from "@/features/dashboard/components/add-repo-button";
import ProjectTable from "@/features/dashboard/components/project-table";
import EmptyState from "@/src/components/ui/empty-state";

export default async function page() {
    const playgrounds = await getAllPlayground();

    return (
        <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <AddNewButton />
                <AddRepoButton />
            </div>

            <div className="mt-10 flex flex-col justify-center items-center w-full">
                {playgrounds && playgrounds.length === 0 ? (
                    <EmptyState
                        title="No projects found"
                        description="Create a new project to get started"
                        imageSrc="/empty-state.svg"
                    />
                ) : (
                    <ProjectTable
                        projects={playgrounds || []}
                        onDeleteProject={deleteProjectById}
                        onUpdateProject={editProjectById}
                        onDuplicateProject={duplicateProjectById}
                    />
                )}
            </div>
        </div>
    );
}
