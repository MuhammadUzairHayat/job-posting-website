"use server"
import { prisma } from './prisma'; // Adjust the import path as needed
import { neon } from "@neondatabase/serverless";


export async function deleteJob(jobId: string): Promise<void> {
    await prisma.job.delete({
        where: { id: jobId },
    });
}


export async function getData() {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL environment variable is not set");
    }
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`...`;
    return data;
}