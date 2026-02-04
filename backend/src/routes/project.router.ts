import express from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import {
  createProject,
  getProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';
const projectsRouter = express.Router();
projectsRouter.post('/', asyncHandler(createProject));
projectsRouter.get('/:projectId', asyncHandler(getProject));
projectsRouter.patch('/:projectId', asyncHandler(updateProject));
projectsRouter.delete('/:projectId', asyncHandler(deleteProject));
export default projectsRouter;
