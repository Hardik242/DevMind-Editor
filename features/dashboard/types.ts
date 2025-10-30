import {Templates} from "@prisma/client";
import {
    Code2Icon,
    CompassIcon,
    DatabaseIcon,
    FlameIcon,
    LightbulbIcon,
    LucideIcon,
    Terminal,
    ZapIcon,
} from "lucide-react";

export interface PlaygroundDataProps {
    id: string;
    name: string;
    icon: string;
    starred: boolean;
}

export const lucideIconsMap: Record<string, LucideIcon> = {
    Zap: ZapIcon,
    Lightbulb: LightbulbIcon,
    Database: DatabaseIcon,
    Compass: CompassIcon,
    Flame: FlameIcon,
    Terminal: Terminal,
    Code: Code2Icon,
};

export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    template: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user: User;
    Starmark: {isMarked: boolean}[];
}

export interface ProjectTableProps {
    projects: Project[];
    onUpdateProject?: (
        id: string,
        data: {title: string; description: string}
    ) => Promise<void>;
    onDeleteProject?: (id: string) => Promise<void>;
    onDuplicateProject?: (id: string) => Promise<void>;
    onMarkasFavorite?: (id: string) => Promise<void>;
}

export interface EditProjectData {
    title: string;
    description: string;
}

export interface TemplateSelectionProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        title: string;
        template: Templates;
        description?: string;
    }) => void;
}

export interface TemplateOption {
    id: string;
    name: string;
    description: string;
    icon: string;
    popularity: number;
    tags: string[];
    features: string[];
    category: "frontend" | "backend" | "fullstack";
}
