import { prisma } from './prisma'; // Adjust the import path as needed


export async function deleteJob(jobId: string): Promise<void> {
    await prisma.job.delete({
        where: { id: jobId },
    });
}