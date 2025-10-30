"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {EditProjectData, Project, ProjectTableProps} from "../types";
import Link from "next/link";
import {Badge} from "@/src/components/ui/badge";
import {format} from "date-fns";
import Image from "next/image";
import {Button} from "@/src/components/ui/button";
import {
    CopyIcon,
    DownloadIcon,
    Edit3Icon,
    ExternalLinkIcon,
    EyeIcon,
    MoreHorizontalIcon,
    Trash2Icon,
} from "lucide-react";
import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/src/components/ui/dialog";
import {Label} from "@/src/components/ui/label";
import {Input} from "@/src/components/ui/input";
import {toast} from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";

export default function ProjectTable({
    projects,
    onUpdateProject,
    onDeleteProject,
    onDuplicateProject,
    onMarkasFavorite,
}: ProjectTableProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );
    const [editData, setEditData] = useState<EditProjectData>({
        title: "",
        description: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [favoutrie, setFavourite] = useState(false);

    function handleEditClick(project: Project) {
        setSelectedProject(project);
        setEditData({title: project.title, description: project.description});
        setEditDialogOpen(true);
    }

    async function handleUpdateProject() {
        if (!selectedProject || !onUpdateProject) return;

        setIsLoading(true);

        try {
            await onUpdateProject(selectedProject.id, editData);
            setEditDialogOpen(false);
            setSelectedProject(null);
            toast.success("Project updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again later");
        } finally {
            setIsLoading(false);
        }
    }

    function copyProjectUrl(projectId: string) {
        const url = `${window.location.origin}/playground/${projectId}`;

        navigator.clipboard.writeText(url);

        toast.success("Project URL copied to clipboard");
    }

    function handleDeleteClick(project: Project) {
        setSelectedProject(project);
        setDeleteDialogOpen(true);
    }

    async function handleDeleteProject() {
        console.log("here 1", selectedProject, onDeleteProject);

        if (!selectedProject || !onDeleteProject) return;

        console.log("here 2");

        setIsLoading(true);

        try {
            await onDeleteProject(selectedProject.id);
            setDeleteDialogOpen(false);
            setSelectedProject(null);
            toast.success("Project deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete project. Please try again later");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDuplicateProject(project: Project) {
        if (!onDuplicateProject) return;

        setIsLoading(true);

        try {
            await onDuplicateProject(project.id);

            toast.success("Project duplication successful");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Project</TableHead>
                            <TableHead>Template</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead className="w-[50px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <Link
                                            href={`/playgorund/${project.id}`}
                                            className="hover:underline">
                                            <span className="font-semibold">
                                                {project.title}
                                            </span>
                                        </Link>
                                        <span className="text-sm text-gray-500 line-clamp-1">
                                            {project.description}
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className="bg-emerald-200 text-primary border-primary/70">
                                        {project.template}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    {format(
                                        new Date(project.createdAt),
                                        "MMM d, yyyy"
                                    )}
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full overflow-hidden">
                                            <Image
                                                src={
                                                    project.user.image ||
                                                    "/placeholder.svg"
                                                }
                                                alt={project.user.name}
                                                width={32}
                                                height={32}
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="text-sm">
                                            {project.user.name}
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8">
                                                <MoreHorizontalIcon className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Open menu
                                                </span>
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent
                                            align="end"
                                            className="w-48">
                                            <DropdownMenuItem asChild>
                                                {/* <MarkedToggleButton
                                                    markedForRevision={
                                                        project.Starmark[0]
                                                            ?.isMarked
                                                    }
                                                    id={project.id}
                                                /> */}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/playground/${project.id}`}
                                                    className="flex items-center">
                                                    <EyeIcon className="h-4 w-4 mr-2" />
                                                    Open Project
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/playground/${project.id}`}
                                                    target="_blank"
                                                    className="flex items-center">
                                                    <ExternalLinkIcon className="h-4 w-4 mr-2" />
                                                    Open in New Tab
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleEditClick(project)
                                                }>
                                                <Edit3Icon className="h-4 w-4 mr-2" />
                                                Edit Project
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleDuplicateProject(
                                                        project
                                                    )
                                                }>
                                                <CopyIcon className="h-4 w-4 mr-2" />
                                                Duplicate
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    copyProjectUrl(project.id)
                                                }>
                                                <DownloadIcon className="h-4 w-4 mr-2" />
                                                Copy URL
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleDeleteClick(project)
                                                }
                                                className="text-destructive focus:text-destructive">
                                                <Trash2Icon className="h-4 w-4 mr-2" />
                                                Delete Project
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={editDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Project</DialogTitle>
                        <DialogDescription>
                            Make changes to your project here. Click save when
                            you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Edit Title</Label>
                            <Input
                                id="title"
                                value={editData.title}
                                onChange={(e) =>
                                    setEditData((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                placeholder="my-project-1"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">
                                Edit Description
                            </Label>
                            <Input
                                id="description"
                                value={editData.description}
                                onChange={(e) =>
                                    setEditData((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="Project description..."
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant={"destructive"}
                            onClick={() => setEditDialogOpen(false)}
                            disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant={"default"}
                            onClick={handleUpdateProject}
                            disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog onOpenChange={setDeleteDialogOpen} open={deleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Project</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-bold text-primary">
                                &quot;
                                {selectedProject?.title}&quot;
                            </span>
                            ? This action cannot be undone. All files and data
                            associated with this project will be permanently
                            removed.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button
                            type="button"
                            disabled={isLoading}
                            onClick={() => setDeleteDialogOpen(false)}
                            variant={"outline"}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
                            disabled={isLoading}
                            onClick={handleDeleteProject}>
                            {isLoading ? "Deleting..." : "Delete Project"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
