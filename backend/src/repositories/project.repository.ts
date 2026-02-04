import { PrismaClient } from '@prisma/client';
import { Project } from '@prisma/client';

const prismaClient = new PrismaClient();
export async function createProject(
  data: Pick<Project, 'name' | 'description' | 'ownerId'>
): Promise<Project> {
  const createdProject = await prismaClient.project.create({ data });
  return createdProject;
}
export async function projectMemberCount(projectId: string): Promise<number> {
  const membersCount = await prismaClient.project.count({
    where: {
      id: projectId,
    },
  });
  return membersCount;
}
export async function todoCount(projectId: string): Promise<number> {
  const todoCount = await prismaClient.task.count({
    where: {
      projectId: projectId,
    },
  });
  return todoCount;
}
export async function inProgressCount(projectId: string): Promise<number> {
  const inProgressCount = await prismaClient.task.count({
    where: {
      projectId: projectId,
      status: 'IN_PROGRESS',
    },
  });
  return inProgressCount;
}
export async function doneCount(projectId: string): Promise<number> {
  const doneCount = await prismaClient.task.count({
    where: {
      projectId: projectId,
      status: 'DONE',
    },
  });
  return doneCount;
}
export async function getProject(projectId: string): Promise<Project | null> {
  const project = await prismaClient.project.findUnique({
    where: {
      id: projectId,
    },
  });
  return project;
}
export async function updateProject(
  projectId: string,
  data: Pick<Project, 'name' | 'description'>
): Promise<Project> {
  const updatedProject = await prismaClient.project.update({
    where: {
      id: projectId,
    },
    data,
  });
  return updatedProject;
}
export async function deleteProject(projectId: string) {
  const deletedProject = await prismaClient.project.delete({
    where: {
      id: projectId,
    },
  });
  return deletedProject;
}
