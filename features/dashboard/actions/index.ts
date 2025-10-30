"use server";

import {currentUser} from "@/features/auth/action";
import {db} from "@/src/lib/db";
import {Templates} from "@prisma/client";
import {revalidatePath} from "next/cache";

export async function createPlayground(data: {
    title: string;
    template: Templates;
    description?: string;
}) {
    const {title, template, description} = data;

    const user = await currentUser();

    try {
        const playground = await db.playground.create({
            data: {
                title,
                description,
                template,
                userId: user?.id!,
            },
        });

        revalidatePath("/dashboard", "layout");

        return playground;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getAllPlayground() {
    const user = await currentUser();

    try {
        const playgrounds = await db.playground.findMany({
            where: {
                userId: user?.id,
            },
            include: {
                user: true,
                Starmark: {
                    where: {
                        userId: user?.id,
                    },
                    select: {
                        isMarked: true,
                    },
                },
            },
        });

        return playgrounds;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteProjectById(id: string) {
    try {
        await db.playground.delete({
            where: {id},
        });

        revalidatePath("/dashboard", "layout");
    } catch (error) {
        console.error(error);
    }
}

export async function editProjectById(
    id: string,
    data: {title: string; description: string}
) {
    try {
        await db.playground.update({
            where: {id},
            data: data,
        });

        revalidatePath("/dashboard", "layout");
    } catch (error) {
        console.error(error);
    }
}

export async function duplicateProjectById(id: string) {
    try {
        const originalPlayground = await db.playground.findUnique({
            where: {id},
        });
        const {
            //@ts-ignore
            id: newId,
            //@ts-ignore
            createdAt,
            //@ts-ignore
            updatedAt,
            ...newOriginalPlayground
        } = originalPlayground;

        if (!originalPlayground) throw new Error("Playground not found");

        await db.playground.create({
            data: {
                ...newOriginalPlayground,
                title: `${originalPlayground.title}_copy`,
            },
        });

        revalidatePath("/dashboard", "layout");
    } catch (error) {
        console.error(error);
    }
}
