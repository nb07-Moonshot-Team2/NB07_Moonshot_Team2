import { Project } from "@prisma/client";
import * as projectRepository from "../repositories/project.repository";
import  {InvalidDataFormatError,NotProjectMemberError, NotProjectOwnerError}  from "../lib/errors";

type CreatedProjectData = Pick<Project, 'name' | 'description' | 'ownerId'>;

export async function createProject(data:CreatedProjectData) {
    const createdProject = await projectRepository.createProject(data);
    const memebersCount  = await projectRepository.projectMemberCount(createdProject.id);   
    const todosCount = await projectRepository.todoCount(createdProject.id);
    const inProgressesCount = await projectRepository.inProgressCount(createdProject.id);
    const donesCount = await projectRepository.doneCount(createdProject.id);
    
    return {
        ...createdProject,
        memberCount: memebersCount || 0,
        todoCount: todosCount || 0,
        inProgressCount: inProgressesCount ||  0,
        doneCount: donesCount || 0,
        createAt: undefined,
        updateAt: undefined
    };
}
export async function getProject(projectId: string) {
    const project = await projectRepository.getProject(projectId);
    if(!project) {throw new InvalidDataFormatError();}
    if(project.ownerId !== projectId) {throw new NotProjectMemberError();}
    const membersCount = await projectRepository.projectMemberCount(projectId);
    const todosCount = await projectRepository.todoCount(projectId);
    const inProgressesCount = await projectRepository.inProgressCount(projectId);
    const  donesCount = await projectRepository.doneCount(projectId);
    return {
        ...project,
        memberCount: membersCount || 0,
        todoCount: todosCount || 0,
        inProgressCount: inProgressesCount ||  0,
        doneCount: donesCount || 0,
        createAt: undefined,
        updateAt: undefined
    };
} 
export  async function updateProject(projectId: string, data: Pick<Project, 'name' | 'description'>) {

    const project = await projectRepository.getProject(projectId);
    if(!project) {throw new InvalidDataFormatError();}
    if(project.ownerId !== projectId) {throw new NotProjectOwnerError();}
    const updatedProject = await projectRepository.updateProject(projectId, data);
    const membersCount = await projectRepository.projectMemberCount(projectId); 
    const todosCount = await projectRepository.todoCount(projectId);
    const inProgressesCount = await projectRepository.inProgressCount(projectId);
    const donesCount = await projectRepository.doneCount(projectId);
    return {
        
        ...updatedProject,
        memberCount: membersCount || 0,
        todoCount: todosCount || 0,
        inProgressCount: inProgressesCount ||  0,
        doneCount: donesCount || 0,
        createAt: undefined,
        updateAt: undefined          
    };
}
export async function deleteProject(projectId: string) {
    const project = await projectRepository.getProject(projectId);
    if(!project) {throw new InvalidDataFormatError();}
    if(project.ownerId !== projectId) {throw new NotProjectOwnerError();}
    const deletedProject = await projectRepository.deleteProject(projectId);
    return deletedProject;
}       