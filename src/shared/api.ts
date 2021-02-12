import { Project, User } from './types';
import axios, { AxiosRequestConfig } from 'axios';

const BACKEND_URL = 'http://localhost:8080/api';
const PROJECT_ROUTE = '/projects';
const ME_ROUTE = '/me';
const INVITATION_ROUTE = '/invitation';

const currentUserId = localStorage.getItem('current_test_user_id') || '1';

const APIconfig: AxiosRequestConfig = {
  headers: {
    'test-user': currentUserId,
    ['Content-Type']: 'application/json',
  },
};

export const getCurrentUser = async () => {
  try {
    const { data, ...rest } = await axios.get<User>(`${BACKEND_URL}${ME_ROUTE}`, APIconfig);
    console.log(data);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getProject = async (projectId?: string) => {
  try {
    const { data } = await axios.get<Project>(`${BACKEND_URL}${PROJECT_ROUTE}/${projectId}`, APIconfig);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getProjectByInvitation = async (invitationCode: string) => {
  try {
    const { data } = await axios.get<Project>(`${BACKEND_URL}${INVITATION_ROUTE}/${invitationCode}`, APIconfig);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getProjects = async () => {
  try {
    const { data } = await axios.get<Project[]>(`${BACKEND_URL}${PROJECT_ROUTE}`, APIconfig);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const createProject = async (projectName: string) => {
  try {
    const { data } = await axios.post(`${BACKEND_URL}${PROJECT_ROUTE}`, { name: projectName }, APIconfig);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const joinProjectByInvitationCode = async (invitationCode: string): Promise<Project> => {
  try {
    const { data } = await axios.put(`${BACKEND_URL}${INVITATION_ROUTE}/${invitationCode}/join`, {}, APIconfig);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const { data } = await axios.delete(`${BACKEND_URL}${PROJECT_ROUTE}/${projectId}`, APIconfig);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const createTask = async (projectId: string, name: string, description?: string) => {
  try {
    const { data } = await axios.post(`${BACKEND_URL}${PROJECT_ROUTE}/${projectId}/tasks`, { name, description }, APIconfig);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const assignTask = async (projectId: string, taskId: string, assigneeId: string) => {
  try {
    const { data } = await axios.put(`${BACKEND_URL}${PROJECT_ROUTE}/${projectId}/tasks/${taskId}/assign`, { assigneeId }, APIconfig);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateTask = async (projectId: string, taskId: string, taskUpdate: any) => {
  try {
    const { data } = await axios.put(`${BACKEND_URL}${PROJECT_ROUTE}/${projectId}/tasks/${taskId}`, taskUpdate, APIconfig);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteTask = async (projectId: string, taskId: string) => {
  try {
    const { data } = await axios.delete(`${BACKEND_URL}${PROJECT_ROUTE}/${projectId}/tasks/${taskId}`, APIconfig);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};
