import {Request,Response} from 'express';
import type {CreatedProjectInput} from '../schemas/project.schema';
import * as projectService from "../services/project.service";
export async function createProject(req :Request,res:Response){
    // treat incoming body as the validated input type
    const body = req.body as CreatedProjectInput;
    const ownerId = req.user!.id;
    const dataWithOwner = { ...body, ownerId };
    const newProject = await projectService.createProject(dataWithOwner);      
    res.status(200).send(newProject);
};
export async function getProject(req :Request,res:Response){
    const projectId = req.params.projectId;
    const project = await projectService.getProject(projectId as string);
    res.status(200).send(project);
};
export async function updateProject(req :Request,res:Response){
    const projectId = req.params.projectId;
    const body = req.body as CreatedProjectInput;
    const updatedProject = await projectService.updateProject(projectId as string,body);
    res.status(200).send(updatedProject);                                                                                  
}

export async function deleteProject(req :Request,res:Response){
    const projectId = req.params.projectId;
    const deletedProject = await projectService.deleteProject(projectId as string);
    res.status(204).send(deletedProject);
}       
